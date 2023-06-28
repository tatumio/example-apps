import { AddressBalance, AddressTransaction } from "@tatumcom/js";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface Tx {
  hash: string;
  counterAddr: string;
  amount: string;
  outgoing: boolean;
}

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/* Extract only native balance in the desired format from all received address balances */
export const getNativeBalance = (data: AddressBalance[]) => {
  for (const bal of data) {
    if (bal.type === "native") return `${bal.balance} ${bal.asset}`;
  }
  return "0";
};

/* Process retrieved transaction data */
export const processTransactions = (data: AddressTransaction[]) => {
  const txs: Tx[] = [];
  for (const tx of data) {
    txs.push({
      hash: tx.hash,
      counterAddr: tx.counterAddress || tx.address,
      amount: tx.amount,
      outgoing: tx.amount.includes("-"),
    });
  }
  return txs;
};
