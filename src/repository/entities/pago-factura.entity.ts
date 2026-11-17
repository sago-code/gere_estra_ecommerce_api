import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity.js';
import { ClienteEntity } from './cliente.entity.js';
import { MetodoPagoEntity } from './metodo-pago.entity.js';

@Entity({ name: 'pago_factura' })
export class PagoFacturaEntity extends BaseEntity {
  @Column({ type: 'timestamp', precision: 6, name: 'fecha_pago' })
  fecha_pago: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'valor_pago' })
  valor_pago: number;

  @ManyToOne(() => ClienteEntity)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;

  @ManyToOne(() => MetodoPagoEntity)
  @JoinColumn({ name: 'metodo_pago_id' })
  metodo_pago: MetodoPagoEntity;
}
