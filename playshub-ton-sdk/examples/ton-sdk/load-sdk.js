async function loadSdk() {
  const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl:
      "https://github.com/playshub/playshub-ton/playshub-ton-sdk/-/raw/24ab800766743ecec5283db161fcf6a7b6ce9a97/figures/tonconnect-manifest.json",
  });

  async function textToBase64(text) {
    const Cell = TonWeb.boc.Cell;
    const cell = new Cell();
    cell.bits.writeUint(0, 32);
    cell.bits.writeString(text);

    const boc = await cell.toBoc();
    return btoa(String.fromCharCode.apply(null, boc));
  }

  const UNITY_TON_PLUGIN = {
    connect: async () => tonConnectUI.openModal(),
    disconnect: async () => tonConnectUI.disconnect(),
    isConnected: () => tonConnectUI.connected,
    getAccount: () => tonConnectUI.account,
    sendTon: async (args) => {
      const tx = {
        validUntil: args.validUntil,
        messages: [
          {
            address: args.address,
            amount: args.amount,
            payload: args.comment
              ? await textToBase64(args.comment)
              : undefined,
          },
        ],
      };
      return tonConnectUI.sendTransaction(tx);
    },
  };

  window.UNITY_TON_PLUGIN = UNITY_TON_PLUGIN;
}

loadSdk();
