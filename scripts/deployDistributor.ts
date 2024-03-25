import { TOKEN_CONTRACT } from "../constants";

require("dotenv").config();

const { ethers } = require("hardhat");

async function main() {
  const privateKey = process.env.WALLET_PRIVATE_KEY;

  const network = await ethers.provider.getNetwork();
  const signers = await ethers.getSigners();



  let signer = signers[0];
  if (network.chainId === 1337) {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    signer = new ethers.Wallet(privateKey, provider);
  }

  const Contract = await ethers.getContractFactory("AirdropDistributor");
  const contract = await Contract.connect(signer).deploy(
    TOKEN_CONTRACT
  );

  await contract.deployed();

  console.log(`Contract deployed to ${contract.address}`);
  const networkName = network.name == "unknown" ? "localhost" : network.name;

  console.log(
    `npx hardhat verify --network ${networkName} ${contract.address} ${TOKEN_CONTRACT}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
