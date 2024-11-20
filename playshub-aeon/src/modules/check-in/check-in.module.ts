import { Module } from '@nestjs/common';
import { AeonModule } from '../aeon/aeon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInOrderEntity } from './entities/check-in-orders.entity';
import { CheckInController } from './check-in.controller';
import { CheckInService } from './check-in.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AeonModule,
    TypeOrmModule.forFeature([CheckInOrderEntity]),
    ConfigModule,
  ],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
