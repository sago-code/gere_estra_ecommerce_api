import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { MunicipioEntity } from './municipio.entity.js';

@Entity({ name: 'ciudad' })
export class CiudadEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @ManyToOne(() => MunicipioEntity)
  @JoinColumn({ name: 'municipio_id' })
  municipio: MunicipioEntity;
}
