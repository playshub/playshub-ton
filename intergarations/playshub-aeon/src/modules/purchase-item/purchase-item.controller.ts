import { Body, Controller, Post, Req } from '@nestjs/common';
import { PurchaseItemService } from './pruchase-item.service';
import { PurchaseItemDto } from './dtos/purchase-item.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('purchase-item-orders')
export class PurchaseItemController {
  constructor(private readonly purchaseItemService: PurchaseItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create purchase item orders' })
  purchase(@Body() dto: PurchaseItemDto) {
    return this.purchaseItemService.purchase(dto);
  }
}
