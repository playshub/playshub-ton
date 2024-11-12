import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { AeonModule } from './modules/aeon/aeon.module';

@Module({
  imports: [ConfigModule.forRoot(), OrdersModule, AeonModule],
})
export class AppModule {}
