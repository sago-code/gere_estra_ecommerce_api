import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from '../controllers/usuario.controller.js';
import { UsuarioService } from '../services/usuario.service.js';
import { CiudadEntity } from '../repository/entities/ciudad.entity.js';
import { RolEntity } from '../repository/entities/rol.entity.js';
import { UsuarioEntity } from '../repository/entities/usuario.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, RolEntity, CiudadEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '1d') as any,
        },
      }),
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
