import { TransactionEntity } from 'src/transaction/transaction.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'block' })
export class BlockEntity {
  @PrimaryColumn()
  hash: string;

  @Column('int')
  number: number;

  @Column('int')
  timestamp: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.blockHash)
  transactions: Promise<TransactionEntity[]>;
}
