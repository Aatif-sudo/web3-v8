import { useWeb3React } from "@web3-react/core";


export const useConnectWallet = () => {
  let chainId;
  let active;
  let account;
  let connectedWallet;
  let activating;

  const { hooks: PriorityHook } = useWeb3React();
  const hook = selectWalletHooks();
  const { useChainId, useAccounts, useIsActivating, useIsActive } = hook;
  const { usePriorityConnector } = PriorityHook;

  chainId = useChainId();
  active = useIsActive();
  account = useAccounts();
  connectedWallet = usePriorityConnector();
  activating = useIsActivating();

  const activate = (connector: any) => {
    checkWallet(connector);
    connector
      .activate(1)
      .then(() => {
        console.log("complete");
      })
      .catch((error: any) => {
        console.error("Activate Func error", error);
      });
  };

  const deactivate = (connector: any) => {
    try {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
      }
    } catch (error) {
      console.error("Deactivate Func error", error);
    }
  };

  return {
    activate,
    deactivate,
    chainId,
    active,
    account,
    connectedWallet,
    activating,
  };
};