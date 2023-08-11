import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name?: string;

  @Column()
  githubRepo?: string;

  @Column()
  defiLLamaId?: string;

  @Column('simple-array')
  addresses?: string[];

  @Column()
  totalTransactions?: number;

  @Column()
  weiUsed?: string;

  @Column()
  tvl?: number;

  @Column()
  githubStars?: number;

  @Column()
  githubActivity?: number;

  @Column()
  easAttestation?: string;

  @Column()
  upvotes?: number;
}
