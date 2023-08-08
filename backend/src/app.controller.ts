import { Controller, Get } from '@nestjs/common';
import { BlockService } from './block/block.service';

@Controller()
export class AppController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHello() {
    return this.blockService.findAll();
  }
}
