import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateProductoPedidoDto } from '../modules/producto-pedido.dto.js';
import { ProductoPedidoService } from '../services/producto-pedido.service.js';

@Controller()
export class ProductoPedidoController {
  constructor(private readonly service: ProductoPedidoService) {}

  @Get('pedidos/:pedidoId/productos')
  findByPedido(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    return this.service.findByPedido(pedidoId);
  }

  @Post('pedidos/:pedidoId/productos')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Body() dto: CreateProductoPedidoDto,
  ) {
    return this.service.create({ ...dto, pedido_id: pedidoId });
  }

  @Delete('producto-pedido/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
