import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity.js';

@Entity({ name: 'metodo_pago' })
export class MetodoPagoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, name: 'nombre_metodo' })
  nombre_metodo: string;
}
