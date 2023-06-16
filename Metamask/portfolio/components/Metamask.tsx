/* Required since nextjs13 to define a client component */
"use client";

import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import * as React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import Button from "./Button";
import Card from "./Card";
import Loading from "./Loading";

const Metamask = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState("");

  const connectMetamask = async () => {
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/connect-a-wallet */
      const acc = await tatum.walletProvider.metaMask.connect();

      // TODO

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
        className={`transition-opacity duration-500 ${
          account ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Card className="text-sm text-white bg-gray-800 rounded-lg shadow-lg p-6">
          TODO
        </Card>
      </Card>
    </div>
  );
};

export default Metamask;
