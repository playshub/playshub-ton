import { Body, Controller, Post, Req } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInDto } from './dtos/check-in.dto';

@Controller('check-in-orders')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  checkIn(@Body() dto: CheckInDto) {
    return this.checkInService.checkIn(dto);
  }
}
