"use client";

import * as React from "react";
import Image from "next/image";
import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import { toast } from "react-hot-toast";

import Button from "./Button";

const Metamask = (): JSX.Element => {
  // TODO: Add proper implementation based on:
  // https://docs.tatum.com/docs/wallet-provider/metamask
  // https://github.com/tatumio/tatum-js/blob/master/README.md

  const [account, setAccount] = React.useState("Connect");

  const connectMetamask = async () => {
    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM,
      });
      const acc = await tatum.walletProvider.metaMask.connect();
      setAccount(acc);
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <Image
        src="/metamask.svg"
        alt="Metamask Logo"
        width={200}
        height={50}
        priority
      />
      <Button onClick={connectMetamask}>{account}</Button>
    </div>
  );
};

export default Metamask;
