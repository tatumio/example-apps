/* Required since nextjs13 to define a client component */
"use client";

import { TatumSDK, Network, Ethereum } from "@tatumio/tatum";
import * as React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { getNativeBalance } from "@/lib/utils";

import Button from "./Button";
import Card from "./Card";
import Loading from "./Loading";

const Metamask = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState("");

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
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/transfer-native-assets */
      const tx = await tatum.walletProvider.metaMask.transferNative(
        address,
        amount
      );

      console.log(tx);
      toast.success("Transfer successful");

      /* https://docs.tatum.com/docs/wallet-address-operations/get-all-assets-the-wallet-holds */
      const bal = await tatum.address.getBalance({ addresses: [account] });

      setBalance(getNativeBalance(bal.data));
    } catch (error) {
      console.error(error);
      toast.error("Transfer failed");
    }

    setLoading(false);
  };

  return (
    <>
      <Card
        className={`absolute transition-opacity duration-500 lg:inset-0 ${
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
            <div className="text-gray-300">{account}</div>
          </Card>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="address" className="font-medium text-gray-300">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full p-2 mt-1 border-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700"
                placeholder="Enter address"
                required
              />
            </div>
            <div className="mb-10">
              <label htmlFor="amount" className="font-medium text-gray-300">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full p-2 mt-1 border-gray-400 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700"
                placeholder="Enter amount"
                required
              />
            </div>
            <Button
              className="w-full border-white"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loading /> : "Send Native Currency"}
            </Button>
          </form>
        </Card>
      </Card>
    </>
  );
};

export default Metamask;
