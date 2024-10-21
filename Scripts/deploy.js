const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const LandTitleRegistry = await ethers.getContractFactory("LandTitleRegistry");

  // Deploy the contract
  const landTitleRegistry = await LandTitleRegistry.deploy();

  // Wait for the contract to be deployed
  await landTitleRegistry.deployed();

  // Print the address of the deployed contract
  console.log("LandTitleRegistry deployed to:", landTitleRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
