import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';
import { IndexerModule } from './indexer/indexer.module';
import appConfig from './config/app';
import databaseConfig from './config/database';
import indexerConfig from './config/indexer';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, indexerConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    TransactionModule,
    BlockModule,
    IndexerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
