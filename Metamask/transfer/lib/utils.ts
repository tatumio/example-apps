import { AddressBalance } from "@tatumcom/js";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const getNativeBalance = (data: AddressBalance[]) => {
  for (const bal of data) {
    if (bal.type === "native") return `${bal.balance} ${bal.asset}`;
  }
  return "0";
};
