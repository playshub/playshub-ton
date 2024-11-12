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
  paymentNetwork?: string;
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
