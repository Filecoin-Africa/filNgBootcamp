const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Get the contract factory
  const HelloFilecoin = await hre.ethers.getContractFactory("HelloFilecoin");
  console.log("Contract factory created");

  // Deploy the contract
  const helloFilecoin = await HelloFilecoin.deploy();
  console.log("Deployment transaction sent:", helloFilecoin.hash);

  // Wait for deployment to be confirmed
  const deployedContract = await helloFilecoin.waitForDeployment();
  console.log("Deployment confirmed. Contract object:", deployedContract);
  console.log("Contract address (target):", deployedContract.target);
  console.log("Contract address (direct):", helloFilecoin.target);

  // Final output
  console.log("HelloFilecoin deployed to:", deployedContract.target);
}

main().catch((error) => {
  console.error("Error during deployment:", error);
  process.exitCode = 1;
});