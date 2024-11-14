import { IsNumberString, IsString } from 'class-validator';

export class CheckInDto {
  @IsString()
  userId: string;
}
