/* Required since nextjs13 to define a client component */
"use client";

import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import * as React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { getNativeBalance } from "@/lib/utils";

import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Loading from "../atoms/Loading";
import Transactions from "../molecules/Transactions";

const Metamask = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [balance, setBalance] = React.useState("");

  const connectMetamask = async () => {
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/connect-a-wallet */
      const acc = await tatum.walletProvider.metaMask.connect();

      /* https://docs.tatum.com/docs/wallet-address-operations/get-all-assets-the-wallet-holds */
      const bal = await tatum.address.getBalance({ addresses: [acc] });

      setAccount(acc);
      setBalance(getNativeBalance(bal.data));

      // TODO: Add transaction fetching
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }

    setLoading(false);
  };

  const executeTestTransaction = async () => {
    // TODO: Add test transaction execution
  };

  return (
    <>
      <Card
        className={`absolute justify-center transition-opacity duration-500 inset-0 ${
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
        className={`transition-opacity min-w-[300px] duration-500 ${
          account ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Card className="text-sm text-white bg-gray-800 rounded-lg shadow-lg p-6">
          <Card className="space-y-3">
            <Image
              className="mb-3"
              src="/metamask.svg"
              alt="Metamask Logo"
              width={60}
              height={15}
              priority
            />
            <div className="text-xl">{balance}</div>
          </Card>
          <Transactions txs={["test 1", "test 2"]} />
          <Button
            className="w-full border-white"
            disabled={loading}
            onClick={executeTestTransaction}
          >
            {loading ? <Loading /> : "Execute Test Transaction"}
          </Button>
        </Card>
      </Card>
    </>
  );
};

export default Metamask;
