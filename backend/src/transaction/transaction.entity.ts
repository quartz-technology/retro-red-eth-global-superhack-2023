import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryColumn()
  hash: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column('bigint')
  gasUsed: string;

  @Column()
  blockHash: string;
}
