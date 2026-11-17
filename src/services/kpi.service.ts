import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class KpiService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  /**
   * KPI 1: Ticket promedio de compra
   * Fórmula: AVG(valor_pago) de la tabla pago_factura
   */
  async ticketPromedio() {
    const result = await this.dataSource.query(
      `SELECT
         COUNT(*) AS total_pagos,
       COALESCE(ROUND(AVG(valor_pago), 0), 0) AS ticket_promedio,
       COALESCE(ROUND(SUM(valor_pago), 2), 0) AS total_ventas
       FROM pago_factura
       WHERE deleted_at IS NULL`,
    );
    return {
      kpi: 'Ticket Promedio de Compra',
      formula: 'AVG(valor_pago) de pago_factura',
      total_pagos: Number(result[0].total_pagos),
      ticket_promedio: Number(result[0].ticket_promedio),
      total_ventas: Number(result[0].total_ventas),
      meta: 150.0,
    };
  }

  /**
   * KPI 2: Tiempo del ciclo de entrega (en días)
   * Fórmula: AVG(DATEDIFF(fecha_entrega_real, created_at)) de pedido
   * Solo pedidos entregados (fecha_entrega_real IS NOT NULL)
   */
  async cicloEntrega() {
    const result = await this.dataSource.query(
      `SELECT
         COUNT(*) AS total_entregados,
         COALESCE(ROUND(AVG(DATEDIFF(fecha_entrega_real, created_at)), 2), 0) AS ciclo_promedio_dias,
         COALESCE(MIN(DATEDIFF(fecha_entrega_real, created_at)), 0) AS min_dias,
       COALESCE(MAX(DATEDIFF(fecha_entrega_real, created_at)), 0) AS max_dias
       FROM pedido
       WHERE fecha_entrega_real IS NOT NULL
         AND deleted_at IS NULL`,
    );
    return {
      kpi: 'Tiempo del Ciclo de Entrega',
      formula:
        'AVG(DATEDIFF(fecha_entrega_real, created_at)) de pedido entregado',
      total_entregados: Number(result[0].total_entregados),
      ciclo_promedio_dias: Number(result[0].ciclo_promedio_dias),
      min_dias: Number(result[0].min_dias),
      max_dias: Number(result[0].max_dias),
      meta: 10,
    };
  }

  /**
   * KPI 3: Productos más vendidos
   * Fórmula: SUM(cantidad) por producto en producto_pedido
   * Top 10
   */
  async productosMasVendidos(limit = 10) {
    const result = await this.dataSource.query(
      `SELECT
         p.id AS producto_id,
         p.nombre AS producto_nombre,
         c.nombre AS categoria,
         COALESCE(SUM(pp.cantidad), 0) AS total_vendido,
         COALESCE(ROUND(SUM(pp.cantidad * pp.precio_unitario), 2), 0) AS ingresos
       FROM producto_pedido pp
       JOIN producto p ON p.id = pp.producto_id
       JOIN categoria c ON c.id = p.categoria_id
       WHERE pp.deleted_at IS NULL
       GROUP BY p.id, p.nombre, c.nombre
       ORDER BY total_vendido DESC
       LIMIT ?`,
      [limit],
    );
    return {
      kpi: 'Productos Más Vendidos',
      formula: 'SUM(cantidad) por producto en producto_pedido',
      limit,
      productos: result.map((r: any) => ({
        producto_id: Number(r.producto_id),
        producto_nombre: r.producto_nombre,
        categoria: r.categoria,
        total_vendido: Number(r.total_vendido),
        ingresos: Number(r.ingresos),
      })),
    };
  }

  /**
   * Devuelve los 3 KPIs en una sola llamada (para el dashboard).
   */
  async resumen() {
    const [ticket, ciclo, top] = await Promise.all([
      this.ticketPromedio(),
      this.cicloEntrega(),
      this.productosMasVendidos(10),
    ]);
    return { ticket_promedio: ticket, ciclo_entrega: ciclo, productos_mas_vendidos: top };
  }
}
