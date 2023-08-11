import { Module } from '@nestjs/common';
import { DefiLlamaService } from './defillama.service';

@Module({
  providers: [DefiLlamaService],
  exports: [DefiLlamaService],
})
export class DefillamaModule {}
