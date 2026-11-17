import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogosController } from '../controllers/catalogos.controller.js';
import { CatalogosService } from '../services/catalogos.service.js';
import { CategoriaEntity } from '../repository/entities/categoria.entity.js';
import { CiudadEntity } from '../repository/entities/ciudad.entity.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { EstadoPedidoEntity } from '../repository/entities/estado-pedido.entity.js';
import { MetodoPagoEntity } from '../repository/entities/metodo-pago.entity.js';
import { ProductoEntity } from '../repository/entities/producto.entity.js';
import { RolEntity } from '../repository/entities/rol.entity.js';
import { UsuarioEntity } from '../repository/entities/usuario.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoEntity,
      CategoriaEntity,
      EstadoPedidoEntity,
      MetodoPagoEntity,
      ClienteEntity,
      UsuarioEntity,
      CiudadEntity,
      RolEntity,
    ]),
  ],
  controllers: [CatalogosController],
  providers: [CatalogosService],
  exports: [CatalogosService],
})
export class CatalogosModule {}
