import crypto from 'crypto';

export const generateOrderNo = () =>
  parseInt(crypto.randomBytes(8).toString('hex'), 16).toString();

export function delay(ms: number = 3000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
