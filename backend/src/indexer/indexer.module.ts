import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { BlockModule } from 'src/block/block.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  providers: [IndexerService],
  imports: [BlockModule, TransactionModule],
})
export class IndexerModule {}
