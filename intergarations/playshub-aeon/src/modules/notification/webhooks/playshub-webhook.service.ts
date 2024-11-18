import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import {
  PlayshubCheckInPayload,
  PlayshubGameCheckInPayload,
  PlayshubGamePurchaseItemPayload,
  PlayshubPurchaseItemPayload,
} from 'src/types/playshub';
import { delay } from 'src/utils';

@Injectable()
export class PlayshubWebhookService {
  private readonly logger = new Logger(PlayshubWebhookService.name);
  private webhookUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.webhookUrl = this.configService.get<string>(
      'PLAYSHUB_GAME_WEBHOOK_URL',
    );
  }

  @OnEvent('aeon.check-in.completed')
  async checkInPush(tx: PlayshubCheckInPayload) {
    return this.trySendWebhook(`${this.webhookUrl}/check-in`, {
      account_id: tx.userId,
    });
  }

  @OnEvent('aeon.purchase-item.completed')
  async purchaseItemPush(tx: PlayshubPurchaseItemPayload) {
    return this.trySendWebhook(`${this.webhookUrl}/purchase-item`, {
      account_id: tx.userId,
      item_id: tx.itemId,
    });
  }

  private async trySendWebhook(
    url: string,
    payload: PlayshubGameCheckInPayload | PlayshubGamePurchaseItemPayload,
    retryCount = 0,
  ) {
    if (!this.webhookUrl) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (e) {
      this.logger.error(`Webhook failed to send. Error: ${e.message}`, {
        retryCount,
        url,
      });
      this.logger.debug(e);
      this.logger.debug(
        `Status: ${e.status}, Message: ${e.statusText || e.message}`,
      );

      // Add a delay before retrying (using exponential backoff)
      const delayMs = Math.pow(2, retryCount) * 1000;
      this.logger.debug(`Retrying webhook. Attempt ${retryCount + 1}`);
      await delay(delayMs);

      if (retryCount == 5) {
        this.logger.error(`Max retry attempts reached for webhook: ${url}`);
        return;
      }

      return this.trySendWebhook(url, payload, retryCount + 1);
    }
  }
}
