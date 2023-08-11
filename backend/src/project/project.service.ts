import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async create({
    name,
    githubRepo,
    defiLLamaId,
    addresses,
    totalTransactions,
    gasUsed,
    tvl,
    githubStars,
    githubActivity,
    easAttestation,
    upvotes,
  }: {
    name?: string;
    githubRepo?: string;
    defiLLamaId?: string;
    addresses?: string[];
    totalTransactions?: number;
    gasUsed?: string;
    tvl?: number;
    githubStars?: number;
    githubActivity?: number;
    easAttestation?: string;
    upvotes?: number;
  }) {
    await this.projectRepository.save({
      name,
      githubRepo,
      defiLLamaId,
      addresses,
      totalTransactions,
      gasUsed,
      tvl,
      githubStars,
      githubActivity,
      easAttestation,
      upvotes,
    });
  }

  async findOne(id: number) {
    return await this.projectRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async update(id: number, project: ProjectEntity) {
    await this.projectRepository.update(id, project);
  }
}
