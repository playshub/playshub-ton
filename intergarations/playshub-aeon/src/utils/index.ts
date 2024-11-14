import crypto from 'crypto';

export const generateOrderNo = () =>
  parseInt(crypto.randomBytes(8).toString('hex'), 16).toString();
