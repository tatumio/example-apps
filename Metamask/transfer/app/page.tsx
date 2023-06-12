import Image from "next/image";
import { Toaster } from "react-hot-toast";

import Metamask from "@/components/Metamask";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Toaster />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed tatum left-0 top-0 flex w-full justify-center border-b pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:p-4">
          Get started with&nbsp;
          <code className="font-bold">Metamask Transfer Example</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://tatum.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/tatum.svg"
              alt="Tatum Logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <Metamask />

      <a
        href="https://docs.tatum.com/"
        className="text-center bg-white border border-black rounded-lg border px-5 py-4 transition-colors hover:bg-black hover:text-white lg:w-[600px]"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="text-2xl font-semibold lg:float-left">
          Docs{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="mt-1.5 text-sm opacity-75 float-right">
          Find in-depth information about Tatum features, SDK and API.
        </p>
      </a>
    </main>
  );
}
