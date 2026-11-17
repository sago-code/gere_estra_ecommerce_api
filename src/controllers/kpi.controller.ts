import { Controller, Get, Query } from '@nestjs/common';
import { KpiService } from '../services/kpi.service.js';

@Controller('kpis')
export class KpiController {
  constructor(private readonly service: KpiService) {}

  @Get()
  resumen() {
    return this.service.resumen();
  }

  @Get('ticket-promedio')
  ticketPromedio() {
    return this.service.ticketPromedio();
  }

  @Get('ciclo-entrega')
  cicloEntrega() {
    return this.service.cicloEntrega();
  }

  @Get('productos-mas-vendidos')
  productosMasVendidos(@Query('limit') limit?: string) {
    const n = limit ? parseInt(limit, 10) : 10;
    return this.service.productosMasVendidos(n);
  }
}
