import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

import { Tx } from "@/lib/utils";

import Card from "../atoms/Card";

const Transactions = ({ txs }: { txs: Tx[] }): JSX.Element => {
  const typeStyle = "h-6 pr-2";

  return (
    <Card className="space-y-0 w-full mt-4 text-center text-gray-200 overflow-scroll max-h-40 divide-y">
      {txs[0] ? (
        txs.map((tx, index) => (
          <a
            className="p-4 hover:bg-gray-900"
            key={index}
            href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center w-full">
              {tx.outgoing ? (
                <>
                  <ArrowTopRightOnSquareIcon className={typeStyle} />
                  <i>To:</i>
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className={typeStyle} />
                  <i>From:</i>
                </>
              )}
              <b className="w-full text-right">{tx.amount}</b>
            </div>
            <p className="mt-3 w-[350px]">{tx.counterAddr}</p>
          </a>
        ))
      ) : (
        <i>No transactions</i>
      )}
    </Card>
  );
};

export default Transactions;
