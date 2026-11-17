import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginDto } from '../modules/login.dto.js';
import { CreateAdminUsuarioDto } from '../modules/create-admin-usuario.dto.js';
import { CiudadEntity } from '../repository/entities/ciudad.entity.js';
import { RolEntity } from '../repository/entities/rol.entity.js';
import { UsuarioEntity } from '../repository/entities/usuario.entity.js';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepo: Repository<UsuarioEntity>,
    @InjectRepository(RolEntity)
    private readonly rolRepo: Repository<RolEntity>,
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepo: Repository<CiudadEntity>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Crea un usuario con rol "Admin". Si el rol no existe, lo crea.
   * La contraseña se almacena hasheada con bcrypt.
   */
  async createAdmin(
    dto: CreateAdminUsuarioDto,
  ): Promise<Omit<UsuarioEntity, 'password'>> {
    const exists = await this.usuarioRepo.findOne({
      where: { correo: dto.correo },
      withDeleted: true,
    });
    if (exists) {
      throw new ConflictException(
        `Ya existe un usuario con el correo ${dto.correo}`,
      );
    }

    const ciudad = await this.ciudadRepo.findOne({
      where: { id: dto.ciudad_id },
    });
    if (!ciudad) {
      throw new NotFoundException(
        `No existe la ciudad con id ${dto.ciudad_id}`,
      );
    }

    let rol = await this.rolRepo.findOne({
      where: { rol_name: 'Admin' },
    });
    if (!rol) {
      rol = this.rolRepo.create({ rol_name: 'Admin' });
      rol = await this.rolRepo.save(rol);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const usuario = this.usuarioRepo.create({
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      ciudad,
      telefono: dto.telefono,
      correo: dto.correo,
      password: hashedPassword,
      rol,
    });

    const usuarioCreado = await this.usuarioRepo.save(usuario);
    return this.sinPassword(usuarioCreado);
  }

  private sinPassword(usuario: UsuarioEntity): Omit<UsuarioEntity, 'password'> {
    const { password, ...rest } = usuario;
    return rest;
  }

  /**
   * Login de usuario. Valida correo + contraseña y devuelve un token JWT.
   * Solo los usuarios con rol "Admin" pueden iniciar sesión.
   */
  async login(dto: LoginDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: { correo: dto.correo },
      relations: { rol: true },
    });

    if (!usuario || !usuario.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(
      dto.password,
      usuario.password,
    );
    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario.rol?.rol_name !== 'Admin') {
      throw new UnauthorizedException(
        'Solo los administradores pueden iniciar sesión',
      );
    }

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol.rol_name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol.rol_name,
      },
    };
  }
}
