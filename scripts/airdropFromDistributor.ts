require("dotenv").config();


import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { DISTRIBUTOR_CONTRACT } from "../constants";
import airdropAddresses from "./recipients/recipients.json";
async function main() {
    const privateKey = process.env.WALLET_PRIVATE_KEY;

    const network = await ethers.provider.getNetwork();
    const signers = await ethers.getSigners();


    let signer = signers[0];
    if (network.chainId === 1337) {
        const provider = new ethers.providers.JsonRpcProvider(
            "http://localhost:8545"
        );
        signer = new ethers.Wallet(privateKey as string, provider) as any;
    }


    const Contract = await ethers.getContractFactory("AirdropDistributor");
    // Attach the contract 
    const distributor = await Contract.attach(DISTRIBUTOR_CONTRACT);

    const airdropAmount = parseEther("300");

    const addressesPerTx = 100;

    // Distribute the airdrop in a loop
    for (let i = 0; i < airdropAddresses.length; i += addressesPerTx) {
        console.log(`Distributing to addresses ${i} to ${i + addressesPerTx}`);
        const addresses = airdropAddresses.slice(i, i + addressesPerTx);
        await distributor.distribute(airdropAmount, addresses);
        console.log(`Distributed to addresses ${i} to ${i + addressesPerTx}`);
    }

    console.log("Airdrop complete");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
