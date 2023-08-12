import { Module } from '@nestjs/common';
import { EasService } from './eas.service';

@Module({
  providers: [EasService],
  exports: [EasService],
})
export class EasModule {}
