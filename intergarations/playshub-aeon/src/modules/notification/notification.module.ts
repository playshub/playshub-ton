import { Module } from '@nestjs/common';
import { PlayshubSocketService } from './socket/playshub-socket.service';
import { PlayshubWebhookService } from './webhooks/playshub-webhook.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PlayshubSocketService, PlayshubWebhookService],
})
export class NotificationModule {}
