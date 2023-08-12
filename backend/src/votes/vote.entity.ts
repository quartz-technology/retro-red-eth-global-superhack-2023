import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vote' })
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  projectId: number;
}
