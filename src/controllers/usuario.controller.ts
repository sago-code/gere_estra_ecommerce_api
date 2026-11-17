import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from '../modules/login.dto.js';
import { CreateAdminUsuarioDto } from '../modules/create-admin-usuario.dto.js';
import { UsuarioService } from '../services/usuario.service.js';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() dto: CreateAdminUsuarioDto) {
    return this.usuarioService.createAdmin(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.usuarioService.login(dto);
  }
}
