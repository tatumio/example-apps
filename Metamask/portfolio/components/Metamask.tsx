/* Required since nextjs13 to define a client component */
"use client";

import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import * as React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import Button from "./Button";
import Card from "./Card";
import Loading from "./Loading";
import { processBalances } from "@/lib/utils";

const Metamask = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [balances, setBalances] = React.useState({});
  const [update, setUpdate] = React.useState(false);
  const [token, setToken] = React.useState({ addr: "", id: "" });
  const [metadata, setMetadata] = React.useState({});

  const connectMetamask = async () => {
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-provider/metamask/connect-a-wallet */
      const acc = await tatum.walletProvider.metaMask.connect();

      setAccount(acc);
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }

    setLoading(false);
  };

  const fetchBalances = async () => {
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/wallet-address-operations/get-all-assets-the-wallet-holds */
      const bal = await tatum.address.getBalance({
        addresses: [
          "0x4edd6b97add54cab38f767618d19d04992a3d55a" /* TODO: replace with acc */,
        ],
      });

      setBalances(processBalances(bal.data));
    } catch (error) {
      console.error(error);
      toast.error("Balances failed to load");
    }

    setLoading(false);
  };

  const getNftMetadata = async (addr: string, id: string) => {
    setLoading(true);

    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/nfts/get-the-metadata-of-a-specific-nft */
      const nft = await tatum.nft.getNftMetadata({
        tokenAddress: addr,
        tokenId: id,
      });

      if (nft.data && nft.data.metadata) setMetadata(nft.data.metadata);
    } catch (error) {
      console.error(error);
      toast.error("Metadata failed to load");
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (!account) return;

    fetchBalances();
  }, [account, update]);

  React.useEffect(() => {
    if (!token.addr || !token.id) return;

    getNftMetadata(token.addr, token.id);
  }, [token]);

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
