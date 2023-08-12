import { Module } from '@nestjs/common';
import { AttesterService } from './attester.service';
import { ProjectModule } from 'src/project/project.module';
import { EasModule } from 'src/eas/eas.module';

@Module({
  providers: [AttesterService],
  exports: [AttesterService],
  imports: [ProjectModule, EasModule],
})
export class AttesterModule {}
