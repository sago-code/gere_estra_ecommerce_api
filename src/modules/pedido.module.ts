import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoController } from '../controllers/pedido.controller.js';
import { PedidoService } from '../services/pedido.service.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { EstadoPedidoEntity } from '../repository/entities/estado-pedido.entity.js';
import { PagoFacturaEntity } from '../repository/entities/pago-factura.entity.js';
import { PedidoEntity } from '../repository/entities/pedido.entity.js';
import { UsuarioEntity } from '../repository/entities/usuario.entity.js';
import { MetodoPagoEntity } from '../repository/entities/metodo-pago.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PedidoEntity,
      ClienteEntity,
      EstadoPedidoEntity,
      PagoFacturaEntity,
      UsuarioEntity,
      MetodoPagoEntity,
    ]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
