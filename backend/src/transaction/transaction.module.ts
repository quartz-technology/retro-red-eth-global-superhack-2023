import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';

@Module({
  providers: [TransactionService],
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  exports: [TransactionService],
})
export class TransactionModule {}
