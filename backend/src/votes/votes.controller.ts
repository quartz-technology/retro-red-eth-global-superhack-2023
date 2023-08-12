import { Body, Controller, Get } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VoteDto } from './dto/VoteDto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get('hasVoted')
  @ApiOperation({ summary: 'Check if user has voted' })
  async getVotes(@Body() vote: VoteDto) {
    const findVote = await this.votesService.findOne(vote);

    if (findVote) {
      return true;
    }
    return false;
  }
}
