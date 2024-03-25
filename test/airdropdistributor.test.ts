// Tests for the castledao staking contract
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { parseEther } from "viem";

// Contracts used in the tests
let exampleToken: Contract;


let owner: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let minterUser: SignerWithAddress;
let user1address: string;
let distributor: Contract;
let rest: SignerWithAddress[] = [];


describe("distributor", function () {
    beforeEach(async () => {
        [owner, user1, user2, user3, minterUser, ...rest] =
            await ethers.getSigners();


        // Deploy the magic and ruby token contracts
        const ERC20 = await ethers.getContractFactory("ExampleToken");
        const ownerAmount = parseEther("10000000");
        exampleToken = await ERC20.deploy(ownerAmount);

        await exampleToken.deployed();

        // Deploy the OGNft contract
        const Contract = await ethers.getContractFactory("AirdropDistributor");
        distributor = await Contract.deploy(exampleToken.address);


        // Send 9M tokens to the distributor from the owner
        await exampleToken.connect(owner).transfer(distributor.address, parseEther("9000000"));


        user1address = await user1.getAddress();
    });

    it("should have the right owner", async () => {
        expect(await distributor.owner()).to.equal(owner.address);
    });

    it("Should distribute 1000 tokens per address to 10 addresses", async () => {
        const addresses = [user1.address, user2.address, user3.address, ...rest.map((x) => x.address)];
        await distributor.distribute(parseEther("1000"), addresses);
        for (let i = 0; i < addresses.length; i++) {
            expect(await exampleToken.balanceOf(addresses[i])).to.equal(parseEther("1000"));
        }
    });


    it("A non owner is not allowed to distribute", async () => {
        await expect(distributor.connect(user1).distribute(parseEther("1000"), [user1.address])).to.be.revertedWith("Ownable: caller is not the owner");
    })

    it("allows to withdraw the tokens", async () => {
        await distributor.withdraw();
        expect(await exampleToken.balanceOf(distributor.address)).to.equal(0);

        //  The owner has the tokens now
        expect(await exampleToken.balanceOf(owner.address)).to.equal(parseEther("10000000"));
    })
});