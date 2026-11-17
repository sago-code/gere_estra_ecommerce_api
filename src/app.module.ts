import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaisEntity } from './repository/entities/pais.entity.js';
import { MunicipioEntity } from './repository/entities/municipio.entity.js';
import { CiudadEntity } from './repository/entities/ciudad.entity.js';
import { RolEntity } from './repository/entities/rol.entity.js';
import { UsuarioEntity } from './repository/entities/usuario.entity.js';
import { ClienteEntity } from './repository/entities/cliente.entity.js';
import { DireccionClienteEntity } from './repository/entities/direccion-cliente.entity.js';
import { CategoriaEntity } from './repository/entities/categoria.entity.js';
import { ProductoEntity } from './repository/entities/producto.entity.js';
import { EstadoPedidoEntity } from './repository/entities/estado-pedido.entity.js';
import { MetodoPagoEntity } from './repository/entities/metodo-pago.entity.js';
import { PagoFacturaEntity } from './repository/entities/pago-factura.entity.js';
import { PedidoEntity } from './repository/entities/pedido.entity.js';
import { ProductoPedidoEntity } from './repository/entities/producto-pedido.entity.js';
import { UsuarioModule } from './modules/usuario.module.js';
import { PedidoModule } from './modules/pedido.module.js';
import { ProductoPedidoModule } from './modules/producto-pedido.module.js';
import { PagoFacturaModule } from './modules/pago-factura.module.js';
import { CatalogosModule } from './modules/catalogos.module.js';
import { KpiModule } from './modules/kpi.module.js';

const entities = [
  PaisEntity,
  MunicipioEntity,
  CiudadEntity,
  RolEntity,
  UsuarioEntity,
  ClienteEntity,
  DireccionClienteEntity,
  CategoriaEntity,
  ProductoEntity,
  EstadoPedidoEntity,
  MetodoPagoEntity,
  PagoFacturaEntity,
  PedidoEntity,
  ProductoPedidoEntity,
];

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        username: config.getOrThrow<string>('DB_USERNAME'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_DATABASE'),
        entities,
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'gere_estra_ecommerce_api',
    }),
    UsuarioModule,
    PedidoModule,
    ProductoPedidoModule,
    PagoFacturaModule,
    CatalogosModule,
    KpiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
