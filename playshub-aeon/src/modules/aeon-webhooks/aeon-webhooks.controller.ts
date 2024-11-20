import { Body, Controller, Post } from '@nestjs/common';
import { AeonWebhooksService } from './aeon-webhooks.service';
import { AeonCallbackDto } from './dtos/aeon-callback.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('aeon-webhooks')
export class AeonWebhooksController {
  constructor(private readonly aeonWebhooksService: AeonWebhooksService) {}
  @Post('callback')
  @ApiOperation({ summary: 'Playshub webhook callback url' })
  callback(@Body() callbackDto: AeonCallbackDto) {
    return this.aeonWebhooksService.callback(callbackDto);
  }
}
