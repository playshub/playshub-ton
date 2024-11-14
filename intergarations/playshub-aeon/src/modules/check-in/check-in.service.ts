import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AeonService } from '../aeon/aeon.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AeonWebhookEventEntity } from '../aeon-webhooks/entities/aeon-webhook-events.entity';
import { CheckInDto } from './dtos/check-in.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CheckInOrderEntity,
  CheckInOrderStatus,
} from './entities/check-in-orders.entity';
import moment from 'moment';
import { generateOrderNo } from 'src/utils';
import { AeonOrderStatus } from '../aeon-webhooks/dtos/aeon-callback.dto';

@Injectable()
export class CheckInService {
  private readonly logger = new Logger(CheckInService.name);

  private readonly amount: string;

  constructor(
    private readonly aeonService: AeonService,
    private readonly configService: ConfigService,
    @InjectRepository(CheckInOrderEntity)
    private checkInOrdersRepository: Repository<CheckInOrderEntity>,
    private eventEmitter: EventEmitter2,
  ) {
    this.amount = this.configService.get<string>('CHECK_IN_AMOUNT');
  }

  async checkIn(args: CheckInDto) {
    try {
      const todayCheckIn = await this.checkInOrdersRepository
        .createQueryBuilder('order')
        .where('order.userId = :userId', { userId: args.userId })
        .andWhere('order.timestamp BETWEEN :startOfDay AND :endOfDay', {
          startOfDay: moment().startOf('day').unix(),
          endOfDay: moment().endOf('day').unix(),
        })
        .getOne();

      if (todayCheckIn) {
        this.logger.debug(`User ${args.userId} has already checked in today`);
        throw new BadRequestException('You have already checked in today');
      }

      const checkInOrder = await this.checkInOrdersRepository.save({
        orderNo: generateOrderNo(),
        userId: args.userId,
        status: CheckInOrderStatus.INIT,
        timestamp: moment().unix(),
      });

      await this.aeonService.createOrder({
        orderNo: checkInOrder.orderNo,
        amount: this.amount,
        userId: args.userId,
      });

      return this.checkInOrdersRepository.update(
        { orderNo: checkInOrder.orderNo },
        { status: CheckInOrderStatus.PENDING },
      );
    } catch (error) {
      this.logger.error('Check-in error');
      this.logger.debug(error);
      throw error;
    }
  }

  @OnEvent('aeon-webhook-event.received')
  async onAeonWebhookEventReceived(event: AeonWebhookEventEntity) {
    const checkInOrder = await this.checkInOrdersRepository.findOne({
      where: { orderNo: event.orderNo },
    });

    if (!checkInOrder) {
      return;
    }

    this.logger.debug(`Received webhook event: ${JSON.stringify(event)}`);

    if (event.orderStatus === AeonOrderStatus.COMPLETED) {
      this.eventEmitter.emit('aeon.check-in.completed', {
        userId: checkInOrder.userId,
        timestamp: checkInOrder.timestamp,
      });
      return this.checkInOrdersRepository.update(
        { orderNo: event.orderNo },
        { status: CheckInOrderStatus.SUCCESS },
      );
    } else if (event.orderStatus === AeonOrderStatus.FAILED) {
      return this.checkInOrdersRepository.update(
        { orderNo: event.orderNo },
        { status: CheckInOrderStatus.FAILED },
      );
    } else {
      // Handle other statuses
    }
  }
}
