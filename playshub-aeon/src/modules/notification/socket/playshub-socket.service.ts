import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { OnEvent } from '@nestjs/event-emitter';
import {
  PlayshubCheckInPayload,
  PlayshubPurchaseItemPayload,
} from 'src/types/playshub';

@WebSocketGateway()
export class PlayshubSocketService {
  @WebSocketServer()
  server: Server;

  @OnEvent('aeon.check-in.completed')
  async checkInPush(tx: PlayshubCheckInPayload) {
    this.server.emit('aeon.check-in.completed', tx);
  }

  @OnEvent('aeon.purchase-item.completed')
  async purchaseItemPush(tx: PlayshubPurchaseItemPayload) {
    this.server.emit('aeon.purchase-item.completed', tx);
  }
}
