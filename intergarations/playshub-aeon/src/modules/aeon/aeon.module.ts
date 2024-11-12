import { Module } from '@nestjs/common';
import { AeonService } from './aeon.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AeonService],
  exports: [AeonService],
})
export class AeonModule {}
