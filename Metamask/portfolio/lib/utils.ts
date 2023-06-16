import { AddressBalance, Nft } from "@tatumcom/js";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Token {
  label: string;
  address: string;
}

interface NftToken extends Token {
  id: string;
  metadata?: Record<string, unknown>;
}

export interface Balances {
  coin: string;
  erc20: Token[];
  erc721: NftToken[];
  erc1155: NftToken[];
}

const getTokenLabel = (bal: string, asset?: string) =>
  asset ? `${bal} ${asset}` : bal;

const getTokenAddress = (address?: string) => address || "?";

const getTokenId = (id?: string) => id || "";

/* https://docs.tatum.com/docs/nfts */
const getMetadata = async (nft: Nft, address?: string, id?: string) => {
  if (!address || !id) return {};
  const nftDetail = await nft.getNftMetadata({
    tokenAddress: address,
    tokenId: id,
  });
  return nftDetail.data && nftDetail.data.metadata
    ? nftDetail.data.metadata
    : {};
};

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/* Process wallet balances in the desired format */
export const processBalances = async (data: AddressBalance[], nft: Nft) => {
  const balances: Balances = {
    coin: "",
    erc20: [],
    erc721: [],
    erc1155: [],
  };

  for (const bal of data) {
    if (bal.type === "native") {
      balances.coin = `${bal.balance} ${bal.asset}`;
    } else if (bal.type === "fungible") {
      balances.erc20.push({
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
      });
    } else if (bal.type === "nft") {
      balances.erc721.push({
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
        metadata: await getMetadata(nft, bal.tokenAddress, bal.tokenId),
      });
    } else if (bal.type === "mutlitoken") {
      balances.erc1155.push({
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
        metadata: await getMetadata(nft, bal.tokenAddress, bal.tokenId),
      });
    }
  }

  return balances;
};
