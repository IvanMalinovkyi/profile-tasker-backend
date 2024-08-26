import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TechnologyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  version: string;
}
