import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "viem";

// Contracts used in the tests
let exampleToken: Contract;

let owner: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let distributor: Contract;
let rest: SignerWithAddress[] = [];

describe("Example Token", function () {
  beforeEach(async () => {
    [owner, user1, user2, user3, ...rest] = await ethers.getSigners();

    // Deploy the magic and ruby token contracts
    const ERC20 = await ethers.getContractFactory("ExampleToken");
    const ownerAmount = parseEther("10000000");
    exampleToken = await ERC20.deploy(ownerAmount, user1.address);

    await exampleToken.deployed();
  });

  it("Sends an amount of tokens to user1", async () => {
    expect(await exampleToken.balanceOf(user1.address)).to.be.greaterThan(0);
  });

  it("Has the right token name and symbol", async () => {
    expect(await exampleToken.name()).to.equal("ExampleToken");
    expect(await exampleToken.symbol()).to.equal("TOKEN");
  });
});
