import axios from "axios";
import crypto from "crypto";

class AeonService {
  private url: string;
  private privateKey: string;
  private apiKey: string;

  constructor(url: string, privateKey: string, apiKey: string) {
    this.url = url;
    this.privateKey = privateKey;
    this.apiKey = apiKey;
  }

  async create({ amount, orderNo }: { amount: string; orderNo: string }) {
    try {
      const body = this.createRequestBody({ amount, orderNo });
      const response = await axios.post(
        `${this.url}/open/api/tg/payment/V2`,
        body
      );

      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));

      if (response.data.error) {
        throw new Error(response.data.msg);
      }

      const model = response.data.model;
      return {
        id: model.orderNo,
        url: model.webUrl,
      };
    } catch (err: any) {
      throw err;
    }
  }

  createRequestBody({ amount, orderNo }: { amount: string; orderNo: string }) {
    const data = {
      appId: this.apiKey,
      merchantOrderNo: orderNo,
      orderAmount: parseFloat(amount),
      payCurrency: "USD",
      paymentTokens: "USDT",
      userId: "myonis@tontopia.com",
      tgModel: "MINIAPP",
      expiredTime: 1800,
      callbackURL: `${process.env.BASE_HOST}/webhook/aeon`,
      orderModel: "ORDER",
    };

    const signature = this.sign(data);
    return {
      ...data,
      sign: signature,
    };
  }

  sign(data: Record<string, any>) {
    const sortedKeys = Object.keys(data).sort();
    const queryString = sortedKeys
      .map((key) => `${key}=${data[key]}`)
      .join("&");
    const stringToSign = `${queryString}&key=${this.privateKey}`;

    return crypto
      .createHash("sha512")
      .update(stringToSign)
      .digest("hex")
      .toUpperCase();
  }

  async verifyWebhook(payload: Record<string, any>, signature: string) {
    try {
      const calculatedSignature = this.sign(payload);
      return calculatedSignature === signature;
    } catch (error) {
      return false;
    }
  }
}

export default AeonService;
