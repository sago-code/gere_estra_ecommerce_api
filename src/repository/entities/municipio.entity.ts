import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { PaisEntity } from './pais.entity.js';

@Entity({ name: 'municipio' })
export class MunicipioEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @ManyToOne(() => PaisEntity)
  @JoinColumn({ name: 'pais_id' })
  pais: PaisEntity;
}
