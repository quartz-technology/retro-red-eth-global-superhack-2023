import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './block.entity';

@Module({
  providers: [BlockService],
  imports: [TypeOrmModule.forFeature([BlockEntity])],
  exports: [BlockService],
})
export class BlockModule {}
