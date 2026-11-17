import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', precision: 6, name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 6, name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', precision: 6, name: 'deleted_at', nullable: true })
  deleted_at: Date | null;
}
