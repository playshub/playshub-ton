import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  orderNo: string;

  @IsNumberString()
  @ApiProperty()
  amount: string;

  @IsString()
  @ApiProperty()
  userId: string;
}
