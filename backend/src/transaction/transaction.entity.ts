import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryColumn()
  hash: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  gasUsed: string;

  @Column()
  value: string;

  @Column()
  blockHash: string;
}
