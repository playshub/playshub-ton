import { IsNumberString, IsString } from 'class-validator';

export class PurchaseItemDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;

  @IsNumberString()
  amount: string;
}
