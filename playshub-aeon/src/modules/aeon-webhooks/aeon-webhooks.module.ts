import { Module } from '@nestjs/common';
import { AeonWebhooksController } from './aeon-webhooks.controller';
import { AeonWebhooksService } from './aeon-webhooks.service';
import { AeonModule } from '../aeon/aeon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeonWebhookEventEntity } from './entities/aeon-webhook-events.entity';

@Module({
  imports: [AeonModule, TypeOrmModule.forFeature([AeonWebhookEventEntity])],
  controllers: [AeonWebhooksController],
  providers: [AeonWebhooksService],
})
export class AeonWebhooksModule {}
