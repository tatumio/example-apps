# `metamask-portfolio`

> Connect your wallet and get all balances

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) utilizing [`@tatumio/tatum`](https://docs.tatum.com/sdk/javascript-typescript-sdk) for a simple [MetaMask](https://metamask.io/) integration. It combines several examples available in [Tatum Docs](https://docs.tatum.com/) into a single straightforward easily customizable mini application capable of connecting to the wallet and getting all token balances on [Sepolia Testnet](https://sepolia.etherscan.io/) blockchain along with metadata in case of NFTs or multitokens.

![Demo](./public/demo.png)

## Prerequisites

- [Node.js 16.8](https://nodejs.org/en) or later.
- macOS, Windows (including WSL), and Linux are supported.

In order to be able to connect your wallet, you also need to have the [MetaMask](https://metamask.io/) extension in your browser. For more information on how to install, configure and use it, please refer to [Getting started with MetaMask](https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask).

You should also make sure to switch to [Sepolia Testnet](https://sepolia.etherscan.io/) network before interacting with the app. In order to be able to play around with it properly, you will need a wallet containing several tokens (ideally not only native and fungible, but also NFTs or multitokens).

There is, however, also an option to skip the process of installing [MetaMask](https://metamask.io/) and obtaining such wallet by simply inputting a different wallet address of your choice you do not necessarily have to own.

## Getting Started

First, install all the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Afterwards, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and feel free to try it out on your own. The project uses following examples (although you can of course fully customize them or try any other ones included in the documentation):

- [Connect a wallet](https://docs.tatum.com/docs/wallet-provider/metamask/connect-a-wallet)
- [Get all assets the wallet holds](https://docs.tatum.com/docs/wallet-address-operations/get-all-assets-the-wallet-holds)
- [Get the metadata of a specific nft](https://docs.tatum.com/docs/nfts/get-the-metadata-of-a-specific-nft)

## Learn More

To learn more about Tatum SDK, take a look at the following resources:

- [Tatum Documentation](https://docs.tatum.com/) - learn more about Tatum features, SDK and API.
- [Example Applications](https://github.com/tatumio/example-apps) - further interactive mini application examples.
