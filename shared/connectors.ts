import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { hooks as metamaskHooks, metamask } from "./allConnectors/metaMask";
import { hooks as coinbaseHooks, coinbase } from "./allConnectors/coinbase";


export const connectors: [
  (
    | MetaMask
    | CoinbaseWallet
  ),
  Web3ReactHooks
][] = [
    [metamask, metamaskHooks],
    [coinbase, coinbaseHooks],
  ];


export const connectorsObject = {
  metamask: {
    connector: metamask,
    hooks: metamaskHooks,
  },
  coinbase: {
    connector: coinbase,
    hooks: coinbaseHooks,
  },
};