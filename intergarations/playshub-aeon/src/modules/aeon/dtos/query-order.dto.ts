import { IsString } from 'class-validator';

export class QueryOrderDto {
  @IsString()
  merchantOrderNo: string;
}
