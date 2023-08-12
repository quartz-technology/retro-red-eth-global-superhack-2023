import { Controller, Get, Param } from '@nestjs/common';
import { VotesService } from './votes.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get('hasVoted/:address/:projectId')
  @ApiOperation({ summary: 'Check if user has voted' })
  async getVotes(
    @Param(':address') address: string,
    @Param(':projectId') projectId: number,
  ) {
    const findVote = await this.votesService.findOne({
      projectId,
      address,
    });

    if (findVote) {
      return true;
    }
    return false;
  }
}
