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
    githubRepos,
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
    githubRepos?: string[];
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
      githubRepos,
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

  async findOneByAddress(address: string) {
    return await this.projectRepository.findOneBy({ addresses: address });
  }

  async findAll() {
    return await this.projectRepository.find();
  }

  async update(id: number, project: ProjectEntity) {
    await this.projectRepository.update(id, project);
  }

  async deleteByAddress(address: string) {
    await this.projectRepository.delete({ addresses: address });
  }
}
