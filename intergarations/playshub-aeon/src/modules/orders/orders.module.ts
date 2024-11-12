import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AeonModule } from '../aeon/aeon.module';

@Module({
  imports: [AeonModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
