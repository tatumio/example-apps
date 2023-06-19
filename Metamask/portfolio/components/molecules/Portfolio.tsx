import { TatumSDK, Network, Ethereum } from "@tatumcom/js";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { Token, Balances } from "@/lib/utils";

import Card from "../atoms/Card";

const Portfolio = ({ balances }: { balances: Balances }): JSX.Element => {
  const [activeTab, setActiveTab] = useState(1);
  const [token, setToken] = React.useState({ addr: "", id: "" });
  const [metadata, setMetadata] = React.useState({});

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const getNftMetadata = async (addr: string, id: string) => {
    try {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      });

      /* https://docs.tatum.com/docs/nfts/get-the-metadata-of-a-specific-nft */
      const nft = await tatum.nft.getNftMetadata({
        tokenAddress: addr,
        tokenId: id,
      });

      if (nft.data && nft.data.metadata) {
        console.log(nft.data.metadata);
        setMetadata(nft.data.metadata);
      }
    } catch (error) {
      console.error(error);
      toast.error("Metadata failed to load");
    }
  };

  React.useEffect(() => {
    if (!token.addr || !token.id) return;

    getNftMetadata(token.addr, token.id);
  }, [token]);

  const Tab = ({
    tabNumber,
    tabText,
  }: {
    tabNumber: number;
    tabText: string;
  }): JSX.Element => (
    <button
      className={`${
        activeTab === tabNumber
          ? "bg-gray-900 text-white"
          : "bg-gray-600 text-gray-200"
      } py-2 px-4 rounded-lg mr-2 w-[110px] focus:outline-none`}
      onClick={() => handleTabChange(tabNumber)}
    >
      {tabText}
    </button>
  );

  const List = ({ items }: { items: Token[] }): JSX.Element => (
    <Card className="mt-4 text-gray-200 space-y-4">
      {items[0] ? (
        items.map((item, index) => (
          <span className="text-center" key={index}>
            <b
              className="cursor-context-menu"
              onClick={() =>
                item.id && setToken({ addr: item.address, id: item.id })
              }
            >
              {item.label}
              {item.id ? ` (${item.id})` : ""}
            </b>
            <a
              href={`https://sepolia.etherscan.io/address/${item.address}`}
              target="_blank"
            >
              <p>{item.address}</p>
            </a>
          </span>
        ))
      ) : (
        <i>No tokens</i>
      )}
    </Card>
  );

  return (
    <Card className="space-y-2">
      <div className="flex mb-4">
        <Tab tabNumber={1} tabText="Fungibles" />
        <Tab tabNumber={2} tabText="NFTs" />
        <Tab tabNumber={3} tabText="Multitokens" />
      </div>

      {activeTab === 1 && <List items={balances.erc20} />}
      {activeTab === 2 && <List items={balances.erc721} />}
      {activeTab === 3 && <List items={balances.erc1155} />}
    </Card>
  );
};

export default Portfolio;
