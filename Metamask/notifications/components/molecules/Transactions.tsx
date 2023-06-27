import React from "react";

import Card from "../atoms/Card";

const Transactions = ({ txs }: { txs: string[] }): JSX.Element => {
  return (
    <Card className="space-y-2 mt-4 text-gray-200 overflow-scroll max-h-40 divide-y">
      {txs[0] ? (
        txs.map((tx, index) => (
          <span className="p-4" key={index}>
            <p>{tx}</p>
          </span>
        ))
      ) : (
        <i>No transactions</i>
      )}
    </Card>
  );
};

export default Transactions;
