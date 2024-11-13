import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../dtos/callback.dto';

@Entity({
  name: 'aeon_webhook_events',
})
export class AeonWebhookEventEntity {
  @Column()
  orderNo: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @Column()
  userId: string;

  @Column()
  merchantOrderNo: string;

  @Column()
  orderCurrency: string;

  @Column()
  orderAmount: string;

  @PrimaryGeneratedColumn()
  sign: string;
}
