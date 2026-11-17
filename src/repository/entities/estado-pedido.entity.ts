import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity.js';

@Entity({ name: 'estado_pedido' })
export class EstadoPedidoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, name: 'nombre_estado' })
  nombre_estado: string;
}
