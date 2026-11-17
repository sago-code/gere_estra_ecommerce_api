import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { ClienteEntity } from './cliente.entity.js';

@Entity({ name: 'direccion_cliente' })
export class DireccionClienteEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, name: 'direccion_cliente' })
  direccion_cliente: string;

  @ManyToOne(() => ClienteEntity)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;
}
