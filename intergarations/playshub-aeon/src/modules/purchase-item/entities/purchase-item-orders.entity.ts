import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum PurchaseItemOrderStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity({ name: 'purchase_item_orders' })
export class PurchaseItemOrderEntity {
  @PrimaryColumn()
  orderNo: string;

  @Column()
  userId: string;

  @Column()
  itemId: string;

  @Column()
  amount: string;

  @Column({ nullable: true })
  paymentUrl?: string;

  @Column({ type: 'enum', enum: PurchaseItemOrderStatus })
  status: PurchaseItemOrderStatus;
}
