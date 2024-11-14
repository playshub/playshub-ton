import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AeonCreateOrderParameters,
  AeonCreateOrderSignParameters,
  AeonQueryOrderSignParameters,
  AeonWebhookCallbackSignParameters,
} from 'src/types/aeon';
import crypto from 'crypto';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class AeonService {
  private readonly logger = new Logger(AeonService.name);

  private baseUrl: string;
  private appId: string;
  private secretKey: string;
  private callbackUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('AEON_BASE_URL');
    this.appId = this.configService.get<string>('AEON_APP_ID');
    this.secretKey = this.configService.get<string>('AEON_SECRET_KEY');
    this.callbackUrl = this.configService.get<string>('AEON_CALLBACK_URL');
  }

  async createOrder({ orderNo, amount, userId }: CreateOrderDto) {
    try {
      const signParams: AeonCreateOrderSignParameters = {
        appId: this.appId,
        merchantOrderNo: orderNo,
        orderAmount: amount,
        payCurrency: 'USD',
        userId,
        paymentTokens: 'USDT',
      };
      const params: AeonCreateOrderParameters = {
        ...signParams,
        sign: this.sign(signParams),
        callbackURL: this.callbackUrl,
        expiredTime: 60,
        paymentNetworks: 'BSC,ETH',
        orderModel: 'ORDER',
        tgModel: 'MINIAPP',
      };

      const response = await fetch(`${this.baseUrl}/open/api/tg/payment/V2`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new BadRequestException(await response.text());
      }

      const data = await response.json();

      if (data.error) {
        this.logger.debug(data);
        throw new BadRequestException(data.msg);
      }

      return data;
    } catch (error) {
      this.logger.error('Create order failed');
      this.logger.debug(error);
      throw error;
    }
  }

  async getOrder(merchantOrderNo: string) {
    try {
      const signParams: AeonQueryOrderSignParameters = {
        appId: this.appId,
        merchantOrderNo,
      };
      const params = {
        ...signParams,
        sign: this.sign(signParams),
      };

      const response = await fetch(`${this.baseUrl}/open/api/payment/query`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new BadRequestException(await response.text());
      }

      return response.json();
    } catch (error) {
      this.logger.error('Get order failed');
      this.logger.debug(error);
      throw error;
    }
  }

  private sign(
    params:
      | AeonCreateOrderSignParameters
      | AeonWebhookCallbackSignParameters
      | AeonQueryOrderSignParameters,
  ) {
    const sortedKeys = Object.keys(params).sort();
    const queryString = sortedKeys
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const stringToSign = `${queryString}&key=${this.secretKey}`;

    return crypto
      .createHash('sha512')
      .update(stringToSign)
      .digest('hex')
      .toUpperCase();
  }

  async verify(params: AeonWebhookCallbackSignParameters, signature: string) {
    try {
      return this.sign(params) === signature;
    } catch (error) {
      return false;
    }
  }
}
