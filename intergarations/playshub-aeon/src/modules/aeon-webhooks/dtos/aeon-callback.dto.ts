import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  orderNo: string;

  @IsEnum(AeonOrderStatus)
  @ApiProperty()
  orderStatus: AeonOrderStatus;

  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  merchantOrderNo: string;

  @IsString()
  @ApiProperty()
  orderCurrency: string;

  @IsString()
  @ApiProperty()
  orderAmount: string;

  @IsString()
  @ApiProperty()
  sign: string;
}
