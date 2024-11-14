import { IsEnum, IsString } from 'class-validator';

export enum AeonOrderStatus {
  COMPLETED = 'COMPLETED',
  CLOSE = 'CLOSE',
  TIMEOUT = 'TIMEOUT',
  FAILED = 'FAILED',
  DELAY_SUCCESS = 'DELAY_SUCCESS',
  DELAY_FAILED = 'DELAY_FAILED',
}

export class AeonCallbackDto {
  @IsString()
  orderNo: string;

  @IsEnum(AeonOrderStatus)
  orderStatus: AeonOrderStatus;

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
