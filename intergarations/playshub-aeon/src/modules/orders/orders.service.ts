import { Injectable } from '@nestjs/common';
import { AeonService } from '../aeon/aeon.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly aeonService: AeonService) {}

  createOrder(args: CreateOrderDto) {
    return this.aeonService.createOrder(args);
  }

  queryOrder(merchantOrderNo: string) {
    return this.aeonService.getOrder(merchantOrderNo);
  }
}
