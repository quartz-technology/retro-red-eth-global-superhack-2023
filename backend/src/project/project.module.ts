import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project.entity';

@Module({
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  exports: [ProjectService],
})
export class ProjectModule {}
