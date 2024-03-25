# Example ERC20 Token

First, rename `.env.example` to `.env` and set the environment variables.

```bash
cp .env.example .env
```

Then, install the dependencies and launch the tests

```bash
yarn
yarn test
```

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
