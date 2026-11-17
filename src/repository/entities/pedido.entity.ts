import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { ClienteEntity } from './cliente.entity.js';
import { EstadoPedidoEntity } from './estado-pedido.entity.js';
import { PagoFacturaEntity } from './pago-factura.entity.js';

@Entity({ name: 'pedido' })
export class PedidoEntity extends BaseEntity {
  @ManyToOne(() => ClienteEntity)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;

  @ManyToOne(() => EstadoPedidoEntity)
  @JoinColumn({ name: 'estado_pedido_id' })
  estado_pedido: EstadoPedidoEntity;

  @Column({ type: 'boolean', name: 'esta_pagado' })
  esta_pagado: boolean;

  @ManyToOne(() => PagoFacturaEntity)
  @JoinColumn({ name: 'pago_id' })
  pago: PagoFacturaEntity | null;

  @Column({ type: 'timestamp', precision: 6, name: 'fecha_entrega_estimada' })
  fecha_entrega_estimada: Date;

  @Column({ type: 'timestamp', precision: 6, name: 'fecha_entrega_real', nullable: true })
  fecha_entrega_real: Date | null;
}
