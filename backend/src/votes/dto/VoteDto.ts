import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  projectId: number;
}
