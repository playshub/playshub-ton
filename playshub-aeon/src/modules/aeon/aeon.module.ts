import { Module } from '@nestjs/common';
import { AeonService } from './aeon.service';
import { ConfigModule } from '@nestjs/config';
import { AeonController } from './aeon.controller';

@Module({
  controllers: [AeonController],
  imports: [ConfigModule],
  providers: [AeonService],
  exports: [AeonService],
})
export class AeonModule {}
