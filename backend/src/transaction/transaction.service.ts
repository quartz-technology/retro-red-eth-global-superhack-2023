import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create({
    hash,
    from,
    to,
    gasUsed,
    blockHash,
  }: {
    hash: string;
    from: string;
    to: string;
    gasUsed: string;
    blockHash: string;
  }) {
    await this.transactionRepository.save({
      hash,
      from,
      to,
      gasUsed,
      blockHash,
    });
  }

  async findOne(hash: string) {
    return await this.transactionRepository.findOneBy({ hash });
  }

  async findAll() {
    return await this.transactionRepository.find();
  }

  async findAllByBlockHash(blockHash: string) {
    return await this.transactionRepository.find({
      where: {
        blockHash,
      },
    });
  }
}
