import TonWeb from "tonweb";
import { SendTransactionResponse } from "@tonconnect/ui";

export async function textToBase64(text: string) {
  const Cell = TonWeb.boc.Cell;
  const cell = new Cell();
  cell.bits.writeUint(0, 32);
  cell.bits.writeString(text);

  const boc = await cell.toBoc();
  return btoa(String.fromCharCode.apply(null, boc));
}

export async function decodeTransactionResponse(
  transactionResponse: SendTransactionResponse
) {
  const bocCellBytes = await TonWeb.boc.Cell.oneFromBoc(
    TonWeb.utils.base64ToBytes(transactionResponse.boc)
  ).hash();
  const hashBase64 = TonWeb.utils.bytesToBase64(bocCellBytes);
  return hashBase64;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
