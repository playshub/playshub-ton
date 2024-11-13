import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CallbackDto } from './dtos/callback.dto';
import { AeonService } from '../aeon/aeon.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AeonWebhookEventEntity } from './entities/aeon-webhook-events.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(
    private readonly aeonService: AeonService,
    @InjectRepository(AeonWebhookEventEntity)
    private aeonWebhookEventRepository: Repository<AeonWebhookEventEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  async callback(callbackDto: CallbackDto) {
    this.logger.debug(`Received callback with: ${JSON.stringify(callbackDto)}`);
    try {
      if (
        !this.aeonService.verify(
          {
            orderNo: callbackDto.orderNo,
            orderStatus: callbackDto.orderStatus,
            userId: callbackDto.userId,
            merchantOrderNo: callbackDto.merchantOrderNo,
            orderCurrency: callbackDto.orderCurrency,
            orderAmount: callbackDto.orderAmount,
          },
          callbackDto.sign,
        )
      ) {
        throw new BadRequestException('Invalid signature');
      }

      const inserted = await this.aeonWebhookEventRepository
        .createQueryBuilder()
        .insert()
        .values({
          orderNo: callbackDto.orderNo,
          orderStatus: callbackDto.orderStatus,
          userId: callbackDto.userId,
          merchantOrderNo: callbackDto.merchantOrderNo,
          orderCurrency: callbackDto.orderCurrency,
          orderAmount: callbackDto.orderAmount,
          sign: callbackDto.sign,
        })
        .orIgnore()
        .returning('*')
        .execute();

      if (inserted.raw.length !== 0) {
        this.eventEmitter.emit('aeon-webhook-event.received', inserted.raw[0]);
      }
    } catch (error) {
      this.logger.error('Webhooks callback error');
      this.logger.debug(error);
      throw error;
    }
  }
}
