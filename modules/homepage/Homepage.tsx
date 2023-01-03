import React, { useEffect } from 'react'
import { useWeb3React } from "@web3-react/core";
import { connectorsObject } from '../../shared/connectors';
import { hooks as metamaskHooks } from '../../shared/allConnectors/metaMask';
import { hooks as CoinbaseHooks, coinbase } from '../../shared/allConnectors/coinbase';
import { Eater } from '@next/font/google';

export const Homepage = () => {

  // const { hooks } = useWeb3React();

  const { useAccounts: useAccounts_metamask, useIsActive: useIsActive_metamask } = metamaskHooks;
  const { useAccounts: useAccounts_coinbase, useIsActive: useIsActive_coinbase } = CoinbaseHooks;
  let connector = connectorsObject.coinbase.connector
  // console.log("web3", useIsActive(), , CoinbaseHooks)

  const account = useAccounts_metamask()
  const active = useIsActive_metamask()

  const coinbaseAccount = useAccounts_coinbase()
  const coinbaseActive = useIsActive_coinbase()

  console.log("hello ", connectorsObject.coinbase.connector, connectorsObject.metamask.connector)


  useEffect(() => {

    console.log("helo2")
    void coinbase.connectEagerly().catch((error) => {
      console.log("error", error)
    })

  }, []);

  const handleConnectCoinbase = () => {

    connectorsObject.coinbase.connector
      .activate(1)
      .then(() =>
        console.log("complete")
      )
      .catch((error: any) => {
        console.error("Activate Func error", error);
      });

  }


  const handleConnectMetamask = () => {

    if (!active) {

      connectorsObject.metamask.connector
        .activate(1)
        .then(() => {
          console.log("complete");
        })
        .catch((error: any) => {
          console.error("Activate Func error", error);
        });
    }
  }


  const handleDeactivateMetamask = () => {

    try {
      if (connectorsObject.metamask.connector?.deactivate) {
        void connectorsObject.metamask.connector.deactivate();
      } else {
        void connectorsObject.metamask.connector.resetState();
      }
    } catch (error) {
      console.error("Deactivate Func error", error);
    }
  }

  const handleDeactivateCoinbase = () => {

    try {
      if (connectorsObject.coinbase.connector?.deactivate) {
        void connectorsObject.coinbase.connector.deactivate();
      } else {
        void connectorsObject.coinbase.connector.resetState();
      }
    } catch (error) {
      console.error("Deactivate Func error", error);
    }
  }



  return (
    <>

      <h1>Connected with account : {account ? account : coinbaseAccount}
      </h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "right", height: "100px" }}>
        <button style={{ height: "50px", width: "200px", margin: "20px" }} onClick={() => handleConnectMetamask()}>
          {active ? 'Connected' : 'Connect Metamask'}
        </button>
      </div >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "right", height: "100px" }}>
        <button style={{ height: "50px", width: "200px", margin: "20px" }} onClick={() => handleDeactivateMetamask()}>
          Deactivate Metamask
        </button>
      </div >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "right", height: "100px" }}>
        <button style={{ height: "50px", width: "200px", margin: "20px" }} onClick={() => handleConnectCoinbase()}>
          Connect Coinbase
        </button>
      </div >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "right", height: "100px" }}>
        <button style={{ height: "50px", width: "200px", margin: "20px" }} onClick={() => handleDeactivateCoinbase()}>
          Deactivate Coinbase
        </button>
      </div >
    </>
  )
}

