import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('aeon.check-in.completed')
  async checkInPush(tx: { userId: string; timestamp: number }) {
    this.server.emit('aeon.check-in.completed', tx);
  }

  @OnEvent('aeon.purchase-item.completed')
  async purchaseItemPush(tx: {
    userId: string;
    itemId: string;
    amount: string;
  }) {
    this.server.emit('aeon.purchase-item.completed', tx);
  }
}
