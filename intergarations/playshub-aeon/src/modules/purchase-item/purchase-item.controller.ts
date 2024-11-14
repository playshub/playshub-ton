import { Body, Controller, Post, Req } from '@nestjs/common';
import { PurchaseItemService } from './pruchase-item.service';
import { PurchaseItemDto } from './dtos/purchase-item.dto';

@Controller('purchase-item-orders')
export class PurchaseItemController {
  constructor(private readonly purchaseItemService: PurchaseItemService) {}

  @Post()
  purchase(@Body() dto: PurchaseItemDto) {
    return this.purchaseItemService.purchase(dto);
  }
}
