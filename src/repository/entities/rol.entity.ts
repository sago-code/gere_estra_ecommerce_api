import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity.js';

@Entity({ name: 'rol' })
export class RolEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, name: 'rol_name' })
  rol_name: string;
}
