"use client";

import * as React from "react";
import Image from "next/image";
import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import { toast } from "react-hot-toast";

import Button from "./Button";
import Card from "./Card";
import Loading from "./Loading";

const Metamask = (): JSX.Element => {
  // TODO: Add proper implementation based on:
  // https://docs.tatum.com/docs/wallet-provider/metamask
  // https://github.com/tatumio/tatum-js/blob/master/README.md

  const [account, setAccount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const connectMetamask = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div>
      <Card
        className={`absolute inset-0 transition-opacity duration-500 ${
          account ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/metamask.svg"
          alt="Metamask Logo"
          width={200}
          height={50}
          priority
        />
        <Button onClick={connectMetamask} disabled={loading}>
          {loading ? <Loading /> : "Connect"}
        </Button>
      </Card>
      <Card
        className={`absolute inset-0 transition-opacity duration-500 ${
          account ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        CONNECTED
      </Card>
    </div>
  );
};

export default Metamask;
