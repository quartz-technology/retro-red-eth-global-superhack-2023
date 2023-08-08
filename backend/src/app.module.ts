import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';
import appConfig from './config/app';
import databaseConfig from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
    }),
    DatabaseModule,
    TransactionModule,
    BlockModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
