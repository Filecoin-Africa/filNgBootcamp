require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const privkey = process.env.PRIVKEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: { yul: false },
      },
    },
  },
  defaultNetwork: "calibrationnet",
  networks: {
    networks: {
      localnet: {
        chainId: 31415926,
        url: "http://127.0.0.1:1234/rpc/v1",
        accounts: [privkey],
      },
      calibrationnet: {
        chainId: 314159,
        url: `https://api.calibration.node.glif.io/rpc/v1`,
        accounts: [privkey],
      },
      filecoinmainnet: {
        chainId: 314,
        url: "https://api.node.glif.io",
        accounts: [privkey],
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
