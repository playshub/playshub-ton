export interface AeonCreateOrderParameters {
  appId: string;
  sign: string;
  merchantOrderNo: string;
  orderAmount: string;
  payCurrency: 'USD' | 'EUR';
  userId: string;
  paymentExchange?: string;
  paymentTokens?: string;
  redirectURL?: string;
  callbackURL?: string;
  customPrams?: string;
  expiredTime?: number;
  payType?: string;
  paymentNetworks?: string;
  orderModel?: 'ORDER' | 'RECHARGE';
  tgModel?: 'BROWSER' | 'MINIAPP' | 'BOT';
}

export interface AeonCreateOrderSignParameters {
  appId: string;
  merchantOrderNo: string;
  orderAmount: string;
  payCurrency: 'USD' | 'EUR';
  userId: string;
  paymentExchange?: string;
  paymentTokens?: string;
}

export interface AeonWebhookCallbackSignParameters {
  orderNo: string;
  orderStatus: string;
  userId: string;
  merchantOrderNo: string;
  orderCurrency: string;
  orderAmount: string;
}
