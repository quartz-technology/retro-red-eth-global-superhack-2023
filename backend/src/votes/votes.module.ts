import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from './vote.entity';
import { VotesController } from './votes.controller';

@Module({
  providers: [VotesService],
  imports: [TypeOrmModule.forFeature([VoteEntity])],
  exports: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
