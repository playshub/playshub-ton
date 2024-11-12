import { Body, Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CallbackDto } from './dtos/callback.dto';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}
  @Post('callback')
  callback(@Body() callbackDto: CallbackDto) {
    return this.webhooksService.callback(callbackDto);
  }
}
