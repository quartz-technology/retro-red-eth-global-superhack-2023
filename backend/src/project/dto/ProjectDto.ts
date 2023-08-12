import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  githubRepos?: string[];

  @ApiProperty()
  defiLLamaId?: string;

  @ApiProperty()
  addresses: string[];

  @ApiProperty()
  totalTransactions?: number;

  @ApiProperty()
  gasUsed?: string;

  @ApiProperty()
  tvl?: number;

  @ApiProperty()
  githubStars?: number;

  @ApiProperty()
  githubActivity?: number;

  @ApiProperty()
  easAttestation?: string;

  @ApiProperty()
  upvotes: number;
}
