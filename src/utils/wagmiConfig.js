import { http, createConfig } from "wagmi";
import { westendAssetHub } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [westendAssetHub],
  transports: {
    [westendAssetHub.id]: http("https://westend-asset-hub-eth-rpc.polkadot.io"),
  },
});
