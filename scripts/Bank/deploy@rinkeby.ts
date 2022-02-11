// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying account:", await deployer.getAddress());
  console.log(
    "Deploying account balance:",
    (await deployer.getBalance()).toString()
  );
  const Rewards = await ethers.getContractFactory("Rewards");
  const rewards = Rewards.attach("");
  console.log("Rewards deployed to:", rewards.address);
  const Bank = await ethers.getContractFactory("Bank");
  const bank = await Bank.deploy(rewards.address);
  await bank.deployed();
  console.log("Bank deployed to:", bank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
