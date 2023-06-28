/* Required since nextjs13 to define a client component */
"use client";

import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import * as React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import { getNativeBalance, processTransactions, Tx } from "@/lib/utils";

import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Loading from "../atoms/Loading";
import Transactions from "../molecules/Transactions";

const Metamask = (): JSX.Element => {
  enum LoadingStatus {
    NONE,
    TX,
    SUB,
  }

  const [loading, setLoading] = React.useState(LoadingStatus.NONE);
  const [account, setAccount] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [receiver, setReceiver] = React.useState("");
  const [transactions, setTransactions] = React.useState<Tx[]>([]);
  const [subscription, setSubscription] = React.useState("");

  const connectMetamask = async () => {
    setLoading(LoadingStatus.TX);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/connect-a-wallet */
      const acc = await tatum.walletProvider.metaMask.connect();

      /* https://docs.tatum.com/docs/wallet-address-operations/get-all-assets-the-wallet-holds */
      const bal = await tatum.address.getBalance({ addresses: [acc] });

      /* https://docs.tatum.com/docs/wallet-address-operations/get-all-transactions-on-the-wallet */
      const txs = await tatum.address.getTransactions({
        address: acc,
        transactionTypes: ["native"],
        pageSize: 10,
      });

      setAccount(acc);
      setBalance(getNativeBalance(bal.data));
      setTransactions(processTransactions(txs.data));

      handleMonitoring(acc);
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }
  };

  const handleMonitoring = async (address: string) => {
    setLoading(LoadingStatus.SUB);

    if (subscription) {
      try {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM_SEPOLIA,
        });

        /* https://docs.tatum.com/docs/notifications/notification-workflow/stop-monitoring-of-the-address */
        await tatum.notification.unsubscribe(subscription);

        toast.success("Subscription deleted");

        setSubscription("");
      } catch (error) {
        console.error(error);
        toast.error("Subscription deletion failed");
      }
    } else {
      try {
        const tatum = await TatumSDK.init<Ethereum>({
          network: Network.ETHEREUM_SEPOLIA,
        });

        /* https://docs.tatum.com/docs/notifications/notification-workflow/get-all-existing-monitoring-subscriptions */
        const existing = await tatum.notification.getAll({ address });

        for (const sub of existing.data) {
          if (sub.type === "INCOMING_NATIVE_TX") {
            console.log(sub);
            toast.success("Subscription already exists");

            setSubscription(sub.id);
            setLoading(LoadingStatus.NONE);

            return;
          }
        }

        /* https://docs.tatum.com/docs/notifications/notification-workflow/start-monitoring-of-the-address */
        const sub = await tatum.notification.subscribe.incomingNativeTx({
          address,
          url: "https://dashboard.tatum.io/webhook-handler",
        });

        console.log(sub);
        toast.success("Subscription created");

        setSubscription(sub.data.id);
      } catch (error) {
        console.error(error);
        toast.error("Subscription creation failed");
      }
    }

    setLoading(LoadingStatus.NONE);
  };

  const executeTestTransaction = async () => {
    setLoading(LoadingStatus.TX);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/transfer-native-assets */
      const tx = await tatum.walletProvider.metaMask.transferNative(
        receiver,
        "0.001"
      );

      console.log(tx);
      toast.success("Transfer successful");
    } catch (error) {
      console.error(error);
      toast.error("Transfer failed");
    }

    setLoading(LoadingStatus.NONE);
  };

  return (
    <>
      <Card
        className={`absolute justify-center transition-opacity duration-500 lg:inset-0 ${
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
        <Button
          onClick={connectMetamask}
          disabled={loading > LoadingStatus.NONE}
        >
          {loading > LoadingStatus.NONE ? <Loading /> : "Connect"}
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
          <Transactions txs={transactions} />
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="block w-[360px] text-center py-2 mt-1 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700"
            placeholder="Enter address to receive ETH"
            required
          />
          <div className="flex flex-row w-full space-x-4">
            <Button
              className="w-full border-white"
              disabled={loading === LoadingStatus.TX || !receiver}
              onClick={executeTestTransaction}
            >
              {loading === LoadingStatus.TX ? <Loading /> : "Send 0.001 ETH"}
            </Button>
            <Button
              className="w-full border-white"
              disabled={loading === LoadingStatus.SUB}
              onClick={() => handleMonitoring(account)}
            >
              {loading === LoadingStatus.SUB ? (
                <Loading />
              ) : subscription ? (
                "Stop monitoring"
              ) : (
                "Start monitoring"
              )}
            </Button>
          </div>
        </Card>
      </Card>
    </>
  );
};

export default Metamask;
