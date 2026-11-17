import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity.js';

@Entity({ name: 'categoria' })
export class CategoriaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  descripcion: string;
}
