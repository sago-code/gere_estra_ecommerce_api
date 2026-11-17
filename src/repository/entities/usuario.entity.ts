import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { CiudadEntity } from './ciudad.entity.js';
import { RolEntity } from './rol.entity.js';

@Entity({ name: 'usuario' })
export class UsuarioEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombres: string;

  @Column({ type: 'varchar', length: 50 })
  apellidos: string;

  @ManyToOne(() => CiudadEntity)
  @JoinColumn({ name: 'ciudad_id' })
  ciudad: CiudadEntity;

  @Column({ type: 'int' })
  telefono: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @ManyToOne(() => RolEntity)
  @JoinColumn({ name: 'rol_id' })
  rol: RolEntity;
}
