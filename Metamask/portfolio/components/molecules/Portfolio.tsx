import { TatumSDK, Network, Ethereum } from "@tatumio/tatum";
import React from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { clsxm, processIpfs } from "@/lib/utils";

import { Token, Balances } from "@/lib/utils";

import Card from "../atoms/Card";
import Tab from "../atoms/Tab";
import Loading from "../atoms/Loading";

const Portfolio = ({ balances }: { balances: Balances }): JSX.Element => {
  const DEFAULT_TOKEN = { addr: "", id: "" };
  const DEFAULT_METADATA = { name: "", description: "", image: "" };

  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(1);
  const [token, setToken] = React.useState(DEFAULT_TOKEN);
  const [metadata, setMetadata] = React.useState(DEFAULT_METADATA);

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
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

      if (nft.data && nft.data.metadata) {
        setMetadata(nft.data.metadata);
      }
    } catch (error) {
      console.error(error);
      toast.error("Metadata failed to load");
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (!token.addr && !token.id) return;

    getNftMetadata(token.addr, token.id);
  }, [token]);

  const TokenList = ({
    items,
    disabled,
  }: {
    items: Token[];
    disabled?: boolean;
  }): JSX.Element => (
    <div className="flex flex-col mt-4 text-gray-200 space-y-0 overflow-scroll max-h-40 divide-y">
      {items[0] ? (
        items.map((item, index) => (
          <span
            className={clsxm(
              "p-4",
              !disabled && "cursor-pointer hover:bg-gray-900"
            )}
            key={index}
            onClick={() =>
              !disabled && setToken({ addr: item.address, id: item.id || "" })
            }
          >
            <b>{item.label}</b>
            <b className="float-right">{item.id ? ` (${item.id})` : ""}</b>
            <p>{item.address}</p>
          </span>
        ))
      ) : (
        <i>No tokens</i>
      )}
    </div>
  );

  return token.id ? (
    <Card className="max-w-[350px] overflow-y-scroll space-y-6">
      <div className="flex items-center w-full">
        <Tab
          className="w-[45px]"
          text={"<"}
          onClick={() => setToken(DEFAULT_TOKEN)}
        />
        <p className="w-full text-right">Tokens</p>
      </div>

      {loading ? (
        <Loading />
      ) : metadata.name || metadata.description ? (
        <Card className="text-center overflow-scroll max-h-40 space-y-6">
          {metadata.image && (
            <Image
              src={processIpfs(metadata.image)}
              alt="Token Image"
              width={100}
              height={100}
              priority
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          )}
          {metadata.name && <b>{metadata.name}</b>}
          {metadata.description && <p>{metadata.description}</p>}
        </Card>
      ) : (
        <i>No metadata</i>
      )}
    </Card>
  ) : (
    <Card className="space-y-2">
      <div className="flex pb-2">
        <Tab
          active={activeTab === 1}
          text="Fungibles"
          onClick={() => handleTabChange(1)}
        />
        <Tab
          active={activeTab === 2}
          text="NFTs"
          onClick={() => handleTabChange(2)}
        />
        <Tab
          active={activeTab === 3}
          text="Multitokens"
          onClick={() => handleTabChange(3)}
        />
      </div>

      {activeTab === 1 && <TokenList items={balances.erc20} disabled />}
      {activeTab === 2 && <TokenList items={balances.erc721} />}
      {activeTab === 3 && <TokenList items={balances.erc1155} />}
    </Card>
  );
};

export default Portfolio;
