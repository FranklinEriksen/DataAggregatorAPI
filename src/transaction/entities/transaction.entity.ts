import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transaction') // Specify the table name (optional)
export class TransactionEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  createdAt: Date;
}
