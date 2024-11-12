import { IsEnum, IsString } from 'class-validator';

export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  CLOSE = 'CLOSE',
  TIMEOUT = 'TIMEOUT',
  FAILED = 'FAILED',
  DELAY_SUCCESS = 'DELAY_SUCCESS',
  DELAY_FAILED = 'DELAY_FAILED',
}

export class CallbackDto {
  @IsString()
  orderNo: string;

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsString()
  userId: string;

  @IsString()
  merchantOrderNo: string;

  @IsString()
  orderCurrency: string;

  @IsString()
  orderAmount: string;

  @IsString()
  sign: string;
}
