import * as React from "react";
import Image from "next/image";

const Metamask = (): JSX.Element => {
  // TODO: Add proper implementation based on:
  // https://docs.tatum.com/docs/wallet-provider/metamask

  return (
    <div>
      <Image
        src="/metamask.svg"
        alt="Metamask Logo"
        width={200}
        height={50}
        priority
      />
    </div>
  );
};

export default Metamask;
