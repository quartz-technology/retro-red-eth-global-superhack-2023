import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project' })
export class ProjectEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, type: 'simple-array' })
  githubRepos?: string[];

  @Column({ nullable: true })
  defiLLamaId?: string;

  @Column({ type: 'simple-array', nullable: true })
  addresses: string[];

  @Column({ nullable: true })
  totalTransactions?: number;

  @Column({ nullable: true })
  gasUsed?: string;

  @Column({ nullable: true })
  tvl?: number;

  @Column({ nullable: true })
  githubStars?: number;

  @Column({ nullable: true })
  githubActivity?: number;

  @Column({ nullable: true })
  easAttestation?: string;

  @Column({ nullable: true, default: 0 })
  upvotes: number;
}
