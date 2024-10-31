import { CHAIN, ConnectedWallet, TonConnectUI } from "@tonconnect/ui";
import TonWeb from "tonweb";
import { decodeTransactionResponse, delay, textToBase64 } from "./utils";
import { MAX_TRIES_COUNT, THREE_SECONDS } from "./constants";

export interface UnityTonPluginProps {
  manifestUrl: string;
  onWalletConnected?: (state: ConnectedWallet) => void;
}

export default class UnityTonPlugin {
  tonConnectUI: TonConnectUI;

  constructor({ manifestUrl, onWalletConnected }: UnityTonPluginProps) {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl,
    });

    this.tonConnectUI.onStatusChange((state) => {
      if (state) {
        onWalletConnected?.(state);
      }
    });
  }

  async connect() {
    if (this.tonConnectUI.connected) {
      alert("Connected");
      return;
    }
    await this.tonConnectUI.openModal();

    let isConnected = this.tonConnectUI.connected;
    let retryCount = 0;
    while (!isConnected) {
      if (retryCount === MAX_TRIES_COUNT) {
        throw Error("User rejected connection");
      }
      await delay(THREE_SECONDS);

      isConnected = this.tonConnectUI.connected;
      retryCount++;
    }

    return this.getAccount();
  }

  async disconnect() {
    if (!this.tonConnectUI.connected) {
      alert("Disconnected");
      return;
    }
    await this.tonConnectUI.disconnect();
  }

  isConnected() {
    return this.tonConnectUI.connected;
  }

  getAccount() {
    const account = this.tonConnectUI.account;
    const address = new TonWeb.utils.Address(account.address);

    const isTestOnly = account.chain === CHAIN.TESTNET;

    return this.resultToJsonString({
      address: address.toString(true, false, false, isTestOnly),
      chain: account.chain === CHAIN.MAINNET ? "MAINNET" : "TESTNET",
    });
  }

  async getBalance() {
    const account = this.tonConnectUI.account;

    let tonweb;
    if (account.chain === CHAIN.MAINNET) {
      tonweb = new TonWeb();
    } else {
      tonweb = new TonWeb(
        new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")
      );
    }
    const balance = await tonweb.getBalance(account.address);

    return this.resultToJsonString({
      balance,
      formatter: TonWeb.utils.fromNano(balance),
    });
  }

  async sendTon(args: string) {
    const parsedArgs = this.jsonStringToArgs(args);
    const txArgs = {
      validUntil: parsedArgs.validUntil,
      messages: [
        {
          address: parsedArgs.address,
          amount: parsedArgs.amount,
          payload: parsedArgs.comment
            ? await textToBase64(parsedArgs.comment)
            : undefined,
        },
      ],
    };

    const response = await this.tonConnectUI.sendTransaction(txArgs);
    return decodeTransactionResponse(response);
  }

  resultToJsonString(result: null | Record<string, any>) {
    if (result == null) {
      return JSON.stringify({});
    } else if (typeof result === "object") {
      return JSON.stringify(result);
    } else {
      throw Error("Invalid result");
    }
  }

  jsonStringToArgs(args: string) {
    try {
      const parsedArgs = JSON.parse(args);
      if (this.isEmptyObject(parsedArgs)) {
        return undefined;
      }

      return parsedArgs;
    } catch (error) {
      throw Error("Invalid JSON string");
    }
  }

  isEmptyObject(obj: Record<string, any>) {
    return Object.getOwnPropertyNames(obj).length === 0;
  }
}
