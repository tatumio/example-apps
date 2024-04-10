import {
  AddressBalance,
  AddressTransaction,
  AddressTransactionUTXO,
} from "@tatumio/tatum";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BN from "bignumber.js";

export interface Tx {
  hash: string;
  counterAddr: string;
  amount: string;
  outgoing: boolean;
}

const formatBalance = (value: string, asset?: string) => `${value} ${asset}`;

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/* Extract only native balance in the desired format from all received address balances */
export const getNativeBalance = (data: AddressBalance[]) => {
  for (const bal of data) {
    if (bal.type === "native") return formatBalance(bal.balance, bal.asset);
  }
  return "0";
};

/* Process retrieved transaction data */
export const processTransactions = (
  data: (AddressTransaction | AddressTransactionUTXO)[]
) => {
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

/* Process retrieved notification */
export const processNotification = (
  bal: string,
  txs: Tx[],
  notif: Record<string, string>
) => {
  if (notif.amount && notif.currency && notif.counterAddress && notif.txId) {
    const balance = bal.split(" ");
    bal = new BN(balance[0]).minus(notif.amount).toFixed();
    bal = formatBalance(bal, notif.currency);

    txs.pop();
    txs.unshift({
      hash: notif.txId,
      counterAddr: notif.counterAddress,
      amount: `-${notif.amount}`,
      outgoing: true,
    });
  }
  return { bal, txs };
};
