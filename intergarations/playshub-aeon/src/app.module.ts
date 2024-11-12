import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [ConfigModule.forRoot(), OrdersModule, WebhooksModule],
})
export class AppModule {}
