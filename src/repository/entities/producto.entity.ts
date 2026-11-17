import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { CategoriaEntity } from './categoria.entity.js';

@Entity({ name: 'producto' })
export class ProductoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  descripcion: string;

  @ManyToOne(() => CategoriaEntity)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaEntity;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  precio: number;
}
