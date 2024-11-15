import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum CheckInOrderStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity({ name: 'check_in_orders' })
export class CheckInOrderEntity {
  @PrimaryColumn()
  orderNo: string;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: CheckInOrderStatus })
  status: CheckInOrderStatus;

  @Column({ nullable: true })
  paymentUrl?: string;

  @Column()
  timestamp: number;
}
