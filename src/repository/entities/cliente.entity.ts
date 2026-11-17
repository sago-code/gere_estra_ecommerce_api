import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { UsuarioEntity } from './usuario.entity.js';

@Entity({ name: 'cliente' })
export class ClienteEntity extends BaseEntity {
  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @Column({ type: 'boolean', name: 'estado_cliente' })
  estado_cliente: boolean;
}
