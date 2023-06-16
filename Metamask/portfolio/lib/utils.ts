import { AddressBalance } from "@tatumcom/js";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Merge classes with tailwind-merge with clsx full feature */
export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

/* Process wallet balances in the desired format */
export const processBalances = (data: AddressBalance[]) => {
  // TODO
};
