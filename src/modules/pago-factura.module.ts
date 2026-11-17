import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoFacturaController } from '../controllers/pago-factura.controller.js';
import { PagoFacturaService } from '../services/pago-factura.service.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { MetodoPagoEntity } from '../repository/entities/metodo-pago.entity.js';
import { PagoFacturaEntity } from '../repository/entities/pago-factura.entity.js';
import { UsuarioEntity } from '../repository/entities/usuario.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PagoFacturaEntity,
      ClienteEntity,
      MetodoPagoEntity,
      UsuarioEntity,
    ]),
  ],
  controllers: [PagoFacturaController],
  providers: [PagoFacturaService],
  exports: [PagoFacturaService],
})
export class PagoFacturaModule {}
