require("dotenv").config();

const { parseEther } = require("ethers/lib/utils");
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

  const OneBillion = parseEther("1000000000");

  const devAddress = "0x1111111111111111111111111111111111111111";

  const Contract = await ethers.getContractFactory("ExampleToken");
  const contract = await Contract.connect(signer).deploy(
    OneBillion,
    devAddress
  );

  await contract.deployed();

  console.log(`Contract deployed to ${contract.address}`);
  const networkName = network.name == "unknown" ? "localhost" : network.name;

  console.log("PLEASE, RUN THE FOLLOWING COMMAND TO VERIFY THE CONTRACT. --- ");

  console.log(
    `npx hardhat verify --network ${networkName} ${contract.address} ${OneBillion} ${devAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
