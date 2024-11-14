import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AeonWebhooksModule } from './modules/aeon-webhooks/aeon-webhooks.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CheckInModule } from './modules/check-in/check-in.module';
import { AeonModule } from './modules/aeon/aeon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('POSTGRES_URL'),
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    AeonModule,
    AeonWebhooksModule,
    CheckInModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
