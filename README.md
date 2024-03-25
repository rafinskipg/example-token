# Example ERC20 Token

## Links

- Generate ascii art: https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20

## Filling the .env file

First, copy the .env.example file and rename it to .env

- How to get Alchemy API key?
  Go to alchemy dashboard, click on "Apps" and create a new app for the BaseChain. It will show you an API Key button. Put it on the .env file.
- How to get the basescan API key?
  Go to basescan.org, click on the "API-KEYs" menu item on the left, and create a new api key. Put it on the .env file.
- How to get the private key?
  Go to metamask, click on the account you want to use, click on the three dots on the right, click on "Account details", click on "Export private key". Put it on the .env file.

## Installation

First, rename `.env.example` to `.env` and set the environment variables.

You will need an Alchemy API key, a wallet private key with funds, and a basescan API key.

Then, install the dependencies and launch the tests (see more information on the Setting up Node JS environment section below).

```bash
yarn
yarn test
```

## Deployment (short info)

```
yarn deploy:mainnet
```

After being deployed it will show you a command to verify the contract.

The contract will mint 1,000,000,000 tokens, with 7.5% sent to the dev wallet.

Edit the file `scripts/deploy.js` to change the dev wallet address.

If you want to change the Name of the token, please edit `contracts/ExampleToken.sol` and change the Name and Ticker, also the file name.
You will need to edit the deploy script to change the ExampleToken to the new name.

## Contracts

This repository contains an example ERC20 token contract. The contract is located in the `contracts/` directory.
It also contains a test suite that tests the contract. The test suite is located in the `test/` directory.
Another contract includes an example Airdrop contract that can be used to distribute tokens to multiple addresses.
Another contract uses Uniswap to provide a full range Liquidity Pool for the token.

## Deployment

The contracts can be deployed to a local development network or to a public testnet or mainnet.

To deploy the contracts to a local development network, run the following command:

```bash
yarn deploy
yarn deploy:testnet
yarn deploy:mainnet
```

## Setting up the environment.

- Install Node JS: https://nodejs.org/en/download/
- https://www.youtube.com/watch?v=Imj8PgG3bZU

Ask chat gpt :D
