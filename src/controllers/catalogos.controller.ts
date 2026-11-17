import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogosService } from '../services/catalogos.service.js';

@Controller()
export class CatalogosController {
  constructor(private readonly service: CatalogosService) {}

  @Get('productos')
  getProductos(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    return this.service.getProductos(limit ?? 100, offset ?? 0);
  }

  @Get('categorias')
  getCategorias() {
    return this.service.getCategorias();
  }

  @Get('estado-pedido')
  getEstadosPedido() {
    return this.service.getEstadosPedido();
  }

  @Get('metodo-pago')
  getMetodosPago() {
    return this.service.getMetodosPago();
  }

  @Get('clientes')
  getClientes(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    return this.service.getClientes(limit ?? 100, offset ?? 0);
  }

  @Get('ciudades')
  getCiudades() {
    return this.service.getCiudades();
  }
}
