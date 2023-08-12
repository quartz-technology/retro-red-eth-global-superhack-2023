import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty()
  address: string;
}
