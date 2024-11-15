import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CheckInDto {
  @IsString()
  @ApiProperty()
  userId: string;
}
