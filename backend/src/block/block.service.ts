import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockEntity } from './block.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockEntity)
    private blockRepository: Repository<BlockEntity>,
  ) {}

  async create({
    hash,
    number,
    timestamp,
  }: {
    hash: string;
    number: number;
    timestamp: number;
  }) {
    await this.blockRepository.save({
      hash,
      number,
      timestamp,
    });
  }

  async findOne(hash: string) {
    return await this.blockRepository.findOneBy({ hash });
  }

  async findAll() {
    return await this.blockRepository.find();
  }

  async findLatest() {
    return await this.blockRepository.findOne({
      order: {
        number: 'DESC',
      },
    });
  }
}
