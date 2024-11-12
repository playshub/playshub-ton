import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CallbackDto } from './dtos/callback.dto';
import { AeonService } from '../aeon/aeon.service';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(private readonly aeonService: AeonService) {}

  callback(callbackDto: CallbackDto) {
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

      // ignore duplicated requests
      // handle the callback
    } catch (error) {
      this.logger.error('Webhooks callback error');
      this.logger.debug(error);
      throw error;
    }
  }
}
