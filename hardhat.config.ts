import * as dotenv from "dotenv";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// require("@nomiclabs/hardhat-ethers");
//require("@nomicfoundation/hardhat-verify");

// require('@nomiclabs/hardhat-web3');

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const key = process.env.ALCHEMY_API_KEY;

if (!key) {
  throw new Error("Missing ALCHEMY_API_KEY environment variable");
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },

  networks: {
    hardhat: {
      chainId: 1337,
      /* forking: {
        // url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ARBITRUM_ALCHEMY_API_KEY}`,
        url: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      }, */
    },
    basesepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.WALLET_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.WALLET_PRIVATE_KEY}`],
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
};

export default config;
