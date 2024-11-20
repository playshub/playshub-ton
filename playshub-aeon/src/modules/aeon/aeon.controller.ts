import { Body, Controller, Post, Req } from '@nestjs/common';
import { QueryOrderDto } from './dtos/query-order.dto';
import { AeonService } from './aeon.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('aeon')
export class AeonController {
  constructor(private readonly aeonService: AeonService) {}

  @Post()
  @ApiOperation({ summary: 'Create playshub orders in aeon protocol' })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.aeonService.createOrder(createOrderDto);
  }

  @Post('query')
  @ApiOperation({ summary: 'Query playshub orders in aeon protocol' })
  queryOrder(@Body() queryOrderDto: QueryOrderDto) {
    return this.aeonService.getOrder(queryOrderDto.merchantOrderNo);
  }
}
