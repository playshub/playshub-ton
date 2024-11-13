import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { AeonModule } from '../aeon/aeon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeonWebhookEventEntity } from './entities/aeon-webhook-events.entity';

@Module({
  imports: [AeonModule, TypeOrmModule.forFeature([AeonWebhookEventEntity])],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
