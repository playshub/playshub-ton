import { Module } from '@nestjs/common';
import { AeonModule } from '../aeon/aeon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PurchaseItemOrderEntity } from './entities/purchase-item-orders.entity';
import { PurchaseItemController } from './purchase-item.controller';
import { PurchaseItemService } from './pruchase-item.service';

@Module({
  imports: [
    AeonModule,
    TypeOrmModule.forFeature([PurchaseItemOrderEntity]),
    ConfigModule,
  ],
  controllers: [PurchaseItemController],
  providers: [PurchaseItemService],
})
export class PurchaseItemModule {}
