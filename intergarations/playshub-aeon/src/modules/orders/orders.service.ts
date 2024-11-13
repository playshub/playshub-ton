import { Injectable, Logger } from '@nestjs/common';
import { AeonService } from '../aeon/aeon.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { AeonWebhookEventEntity } from '../webhooks/entities/aeon-webhook-events.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(private readonly aeonService: AeonService) {}

  createOrder(args: CreateOrderDto) {
    return this.aeonService.createOrder(args);
  }

  queryOrder(merchantOrderNo: string) {
    return this.aeonService.getOrder(merchantOrderNo);
  }

  @OnEvent('aeon-webhook-event.received')
  async onAeonWebhookEventReceived(event: AeonWebhookEventEntity) {
    this.logger.debug(`Received webhook event: ${JSON.stringify(event)}`);
  }
}
