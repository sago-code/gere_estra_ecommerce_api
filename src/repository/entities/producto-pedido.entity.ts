import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { ProductoEntity } from './producto.entity.js';
import { PedidoEntity } from './pedido.entity.js';

@Entity({ name: 'producto_pedido' })
export class ProductoPedidoEntity extends BaseEntity {
  @ManyToOne(() => ProductoEntity)
  @JoinColumn({ name: 'producto_id' })
  producto: ProductoEntity;

  @ManyToOne(() => PedidoEntity)
  @JoinColumn({ name: 'pedido_id' })
  pedido: PedidoEntity;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'precio_unitario' })
  precio_unitario: number;
}
