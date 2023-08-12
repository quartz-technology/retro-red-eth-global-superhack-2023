import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectController } from './project.controller';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectEntity]), VotesModule],
  exports: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
