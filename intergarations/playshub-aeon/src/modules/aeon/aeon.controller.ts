import { Body, Controller, Post, Req } from '@nestjs/common';
import { QueryOrderDto } from './dtos/query-order.dto';
import { AeonService } from './aeon.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('aeon')
export class AeonController {
  constructor(private readonly aeonService: AeonService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.aeonService.createOrder(createOrderDto);
  }

  @Post('query')
  queryOrder(@Body() queryOrderDto: QueryOrderDto) {
    return this.aeonService.getOrder(queryOrderDto.merchantOrderNo);
  }
}
