import { Module } from '@nestjs/common';
import { FetcherService } from './fetcher.service';
import { DefillamaModule } from 'src/defillama/defillama.module';
import { GithubModule } from 'src/github/github.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [FetcherService],
  imports: [DefillamaModule, GithubModule, TransactionModule, ProjectModule],
})
export class FetcherModule {}
