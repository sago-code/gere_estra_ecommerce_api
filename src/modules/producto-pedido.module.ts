import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoPedidoController } from '../controllers/producto-pedido.controller.js';
import { ProductoPedidoService } from '../services/producto-pedido.service.js';
import { CategoriaEntity } from '../repository/entities/categoria.entity.js';
import { PedidoEntity } from '../repository/entities/pedido.entity.js';
import { ProductoEntity } from '../repository/entities/producto.entity.js';
import { ProductoPedidoEntity } from '../repository/entities/producto-pedido.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoPedidoEntity,
      PedidoEntity,
      ProductoEntity,
      CategoriaEntity,
    ]),
  ],
  controllers: [ProductoPedidoController],
  providers: [ProductoPedidoService],
  exports: [ProductoPedidoService],
})
export class ProductoPedidoModule {}
