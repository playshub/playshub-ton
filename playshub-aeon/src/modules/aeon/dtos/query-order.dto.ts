import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryOrderDto {
  @IsString()
  @ApiProperty()
  merchantOrderNo: string;
}
