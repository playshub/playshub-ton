import { IsNumberString, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  orderNo: string;

  @IsNumberString()
  amount: string;

  @IsString()
  userId: string;
}
