import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';
import { IndexerModule } from './indexer/indexer.module';
import { ProjectModule } from './project/project.module';
import { GithubModule } from './github/github.module';
import { DefillamaModule } from './defillama/defillama.module';
import { FetcherModule } from './fetcher/fetcher.module';
import { EasModule } from './eas/eas.module';
import { AttesterModule } from './attester/attester.module';
import appConfig from './config/app';
import databaseConfig from './config/database';
import indexerConfig from './config/indexer';
import fetcherConfig from './config/fetcher';
import attesterConfig from './config/attester';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        databaseConfig,
        indexerConfig,
        fetcherConfig,
        attesterConfig,
      ],
      isGlobal: true,
    }),
    DatabaseModule,
    TransactionModule,
    BlockModule,
    IndexerModule,
    ProjectModule,
    GithubModule,
    DefillamaModule,
    FetcherModule,
    EasModule,
    AttesterModule,
  ],
})
export class AppModule {}
