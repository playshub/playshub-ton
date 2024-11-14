import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AeonOrderStatus } from '../dtos/aeon-callback.dto';

@Entity({
  name: 'aeon_webhook_events',
})
export class AeonWebhookEventEntity {
  @Column()
  orderNo: string;

  @Column({
    type: 'enum',
    enum: AeonOrderStatus,
  })
  orderStatus: AeonOrderStatus;

  @Column()
  userId: string;

  @Column()
  merchantOrderNo: string;

  @Column()
  orderCurrency: string;

  @Column()
  orderAmount: string;

  @PrimaryColumn()
  sign: string;
}
