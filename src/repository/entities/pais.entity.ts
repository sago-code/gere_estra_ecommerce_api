import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity.js';

@Entity({ name: 'pais' })
export class PaisEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombre: string;
}
