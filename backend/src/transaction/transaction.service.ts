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
    value,
    blockHash,
  }: {
    hash: string;
    from: string;
    to: string;
    gasUsed: string;
    value: string;
    blockHash: string;
  }) {
    await this.transactionRepository.save({
      hash,
      from,
      to,
      gasUsed,
      value,
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

  async countByContractAddress(contractAddress: string) {
    return await this.transactionRepository.count({
      where: {
        to: contractAddress,
      },
    });
  }

  async sumGasUsedByContractAddress(contractAddress: string): Promise<bigint> {
    const gasUsed = await this.transactionRepository
      .createQueryBuilder('transaction')
      .select('transaction.gasUsed')
      .where('transaction.to = :contractAddress', { contractAddress })
      .getRawMany();

    return gasUsed.reduce(
      (acc, cur) => acc + BigInt(cur.transaction_gasUsed),
      0n,
    );
  }

  async getUniqueContracts() {
    return (
      await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('transaction.to')
        .distinct(true)
        .getRawMany()
    ).map((item) => item.transaction_to);
  }
}
