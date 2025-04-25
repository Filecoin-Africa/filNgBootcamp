const hre = require("hardhat");

async function main() {
  // Initial tasks for the todo list
  const initialTasks = [
    "Complete smart contract deployment",
    "Write test cases",
    "Implement frontend",
    "Test on testnet",
    "Launch on mainnet"
  ];

  // Deploy the contract
  const TodoList = await hre.ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy(initialTasks);

  await todoList.waitForDeployment();

  console.log("TodoList deployed to:", await todoList.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
