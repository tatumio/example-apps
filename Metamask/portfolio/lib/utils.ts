import { AddressBalance } from "@tatumio/tatum";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface Token {
  label: string;
  address: string;
  id?: string;
}

export interface Balances {
  coin: string;
  erc20: Token[];
  erc721: Token[];
  erc1155: Token[];
}

const getTokenLabel = (asset?: string, bal?: string) =>
  `${asset || "Unknown"}${bal ? `: ${bal}` : ""}`;

const getTokenAddress = (address?: string) => address || "?";

const getTokenId = (id?: string) => id || "";

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/* Format ipfs into a usable url or return placeholder */
export const processIpfs = (img: string) => {
  const prefix = "https://ipfs.io/ipfs/";
  const processed = img.replace("ipfs://", prefix);
  return processed.startsWith(prefix) ? processed : "/placeholder.png";
};

/* Process wallet balances in the desired format */
export const processBalances = (data: AddressBalance[]) => {
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
        label: getTokenLabel(bal.asset, bal.balance),
        address: getTokenAddress(bal.tokenAddress),
      });
    } else if (bal.type === "nft") {
      balances.erc721.push({
        label: getTokenLabel(bal.asset),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
      });
    } else {
      balances.erc1155.push({
        label: getTokenLabel(bal.asset, bal.balance),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
      });
    }
  }

  return balances;
};
