import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import morgan from 'morgan';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: any, res: any, next: () => void) {
    morgan('combined', {
      stream: {
        write: (message) => this.logger.log(message),
      },
    })(req, res, next);
  }
}
