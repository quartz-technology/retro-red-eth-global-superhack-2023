import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from './vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>,
  ) {}

  async create({ projectId, address }: { projectId: number; address: string }) {
    await this.voteRepository.save({
      projectId,
      address,
    });
  }

  async findOne({
    projectId,
    address,
  }: {
    projectId: number;
    address: string;
  }) {
    return await this.voteRepository.findOneBy({ projectId, address });
  }
}
