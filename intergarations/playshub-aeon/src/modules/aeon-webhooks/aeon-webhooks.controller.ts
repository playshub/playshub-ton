import { Body, Controller, Post } from '@nestjs/common';
import { AeonWebhooksService } from './aeon-webhooks.service';
import { AeonCallbackDto } from './dtos/aeon-callback.dto';

@Controller('aeon-webhooks')
export class AeonWebhooksController {
  constructor(private readonly aeonWebhooksService: AeonWebhooksService) {}
  @Post('callback')
  callback(@Body() callbackDto: AeonCallbackDto) {
    return this.aeonWebhooksService.callback(callbackDto);
  }
}
