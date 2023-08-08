# `metamask-notifications`

> Connect your wallet and keep track of your transactions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) utilizing [`@tatumio/tatum`](https://docs.tatum.com/sdk/javascript-typescript-sdk) for a simple [MetaMask](https://metamask.io/) integration. It combines several examples available in [Tatum Docs](https://docs.tatum.com/) into a single straightforward easily customizable mini application capable of connecting to the wallet, displaying recent transactions of native currency and monitoring further outgoing native currency transfers on [Sepolia Testnet](https://sepolia.etherscan.io/).

![Demo](./public/demo.png)

## Prerequisites

- [Node.js 16.8](https://nodejs.org/en) or later.
- macOS, Windows (including WSL), and Linux are supported.

In order to be able to connect your wallet, you also need to have the [MetaMask](https://metamask.io/) extension in your browser. For more information on how to install, configure and use it, please refer to [Getting started with MetaMask](https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask).

You should also make sure to switch to [Sepolia Testnet](https://sepolia.etherscan.io/) network before interacting with the app and get some of its native currency. You can utilize one of many different faucets for that, for example:

- https://sepolia-faucet.pk910.de
- https://www.infura.io/faucet/sepolia
- https://sepoliafaucet.com

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
- [Get all transactions on the wallet](https://docs.tatum.com/docs/wallet-address-operations/get-all-transactions-on-the-wallet)
- [Get all existing monitoring subscriptions](https://docs.tatum.com/docs/notifications/notification-workflow/get-all-existing-monitoring-subscriptions)
- [Start monitoring of the address](https://docs.tatum.com/docs/notifications/notification-workflow/start-monitoring-of-the-address)
- [Stop monitoring of the address](https://docs.tatum.com/docs/notifications/notification-workflow/stop-monitoring-of-the-address)

The general idea is to see the list of your recent transactions, and upon clicking on `Send 0.001 ETH` and going through with the transaction, you should get a notification about it which will automatically update said list and balance.

However, bear in mind that in order to receive those notifications, the monitoring must be active (if you press `Stop monitoring`, it will stop working) and you cannot use localhost because it is relying on webhooks. In order to see the whole flow from beginning to end, it is recommended to either use the live version instead, deploy it somewhere yourself or utilize some tool for temporarily serving your localhost to a public URL such as [Ngrok](https://ngrok.com).

## Learn More

To learn more about Tatum SDK, take a look at the following resources:

- [Tatum Documentation](https://docs.tatum.com/) - learn more about Tatum features, SDK and API.
- [Example Applications](https://github.com/tatumio/example-apps) - further interactive mini application examples.
