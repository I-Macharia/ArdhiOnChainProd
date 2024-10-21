require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */


const { PRIVATE_KEY, BASE_RPC_URL } = process.env;

module.exports = {
  solidity: "0.8.0", // or your specific version
  networks: {
    sepolia: {
      url: BASE_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
