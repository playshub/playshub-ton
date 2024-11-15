import { Injectable, Logger } from '@nestjs/common';
import { AeonService } from '../aeon/aeon.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AeonWebhookEventEntity } from '../aeon-webhooks/entities/aeon-webhook-events.entity';
import { PurchaseItemDto } from './dtos/purchase-item.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PurchaseItemOrderEntity,
  PurchaseItemOrderStatus,
} from './entities/purchase-item-orders.entity';
import moment from 'moment';
import { generateOrderNo } from 'src/utils';
import { AeonOrderStatus } from '../aeon-webhooks/dtos/aeon-callback.dto';

@Injectable()
export class PurchaseItemService {
  private readonly logger = new Logger(PurchaseItemService.name);

  constructor(
    private readonly aeonService: AeonService,
    @InjectRepository(PurchaseItemOrderEntity)
    private purchaseItemOrdersRepository: Repository<PurchaseItemOrderEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  async purchase(args: PurchaseItemDto) {
    try {
      const purchaseItemOrder = await this.purchaseItemOrdersRepository.save({
        orderNo: generateOrderNo(),
        userId: args.userId,
        itemId: args.itemId,
        amount: args.amount,
        status: PurchaseItemOrderStatus.INIT,
      });

      await this.aeonService.createOrder({
        orderNo: purchaseItemOrder.orderNo,
        amount: args.amount,
        userId: args.userId,
      });

      return this.purchaseItemOrdersRepository.save({
        ...purchaseItemOrder,
        status: PurchaseItemOrderStatus.PENDING,
      });
    } catch (error) {
      this.logger.error('Purchase item error');
      this.logger.debug(error);
      throw error;
    }
  }

  @OnEvent('aeon-webhook-event.received')
  async onAeonWebhookEventReceived(event: AeonWebhookEventEntity) {
    const purchaseItemOrder = await this.purchaseItemOrdersRepository.findOne({
      where: { orderNo: event.merchantOrderNo },
    });

    if (!purchaseItemOrder) {
      return;
    }

    this.logger.debug(`Received webhook event: ${JSON.stringify(event)}`);

    if (event.orderStatus === AeonOrderStatus.COMPLETED) {
      this.eventEmitter.emit('aeon.purchase-item.completed', {
        userId: purchaseItemOrder.userId,
        itemId: purchaseItemOrder.itemId,
        amount: purchaseItemOrder.amount,
      });
      return this.purchaseItemOrdersRepository.update(
        { orderNo: event.orderNo },
        { status: PurchaseItemOrderStatus.SUCCESS },
      );
    } else if (event.orderStatus === AeonOrderStatus.FAILED) {
      return this.purchaseItemOrdersRepository.update(
        { orderNo: event.orderNo },
        { status: PurchaseItemOrderStatus.FAILED },
      );
    } else {
      // Handle other statuses
    }
  }
}
