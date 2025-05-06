import { defineChain } from "viem";

export const WestendTestnet = defineChain({
  id: 420420421,
  name: "Westend Asset hub",
  nativeCurrency: {
    decimals: 12,
    name: "Westend",
    symbol: "WND",
  },
  rpcUrls: {
    default: {
      http: ["https://westend-asset-hub-eth-rpc.polkadot.io"],
      webSocket: ["https://westend-asset-hub-eth-rpc.polkadot.io"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://westend.subscan.io/" },
  },
});
