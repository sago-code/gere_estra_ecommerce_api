import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  apellidos: string;

  @IsInt()
  ciudad_id: number;

  @IsInt()
  telefono: number;

  @IsEmail()
  @Length(1, 50)
  correo: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;
}
