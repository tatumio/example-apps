import { AddressBalance } from "@tatumcom/js";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface Token {
  label: string;
  address: string;
}

interface NftToken extends Token {
  id: string;
}

interface Balances {
  coin: string;
  erc20: Token[];
  erc721: NftToken[];
  erc1155: NftToken[];
}

const getTokenLabel = (bal: string, asset?: string) =>
  asset ? `${bal} ${asset}` : bal;

const getTokenAddress = (address?: string) => address || "?";

const getTokenId = (id?: string) => id || "";

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

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
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
      });
    } else if (bal.type === "nft") {
      balances.erc721.push({
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
      });
    } else if (bal.type === "mutlitoken") {
      balances.erc1155.push({
        label: getTokenLabel(bal.balance, bal.asset),
        address: getTokenAddress(bal.tokenAddress),
        id: getTokenId(bal.tokenId),
      });
    }
  }

  return balances;
};
