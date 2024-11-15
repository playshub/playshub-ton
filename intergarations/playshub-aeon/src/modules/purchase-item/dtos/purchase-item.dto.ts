import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class PurchaseItemDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  itemId: string;

  @IsNumberString()
  @ApiProperty()
  amount: string;
}
