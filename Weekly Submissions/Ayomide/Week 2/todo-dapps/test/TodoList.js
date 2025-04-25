const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList", function () {
  let TodoList;
  let todoList;
  let owner;
  let addr1;
  const initialTasks = [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5"
  ];

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy(initialTasks);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await todoList.owner()).to.equal(owner.address);
    });

    it("Should have 5 initial tasks", async function () {
      expect(await todoList.getTodoCount()).to.equal(5);
    });
  });

  describe("Transactions", function () {
    it("Should allow owner to add a task", async function () {
      await todoList.addTodo("New Task");
      expect(await todoList.getTodoCount()).to.equal(6);
      const [task, completed] = await todoList.getTodo(5);
      expect(task).to.equal("New Task");
      expect(completed).to.equal(false);
    });

    it("Should allow owner to mark task as complete", async function () {
      await todoList.markComplete(0);
      const [, completed] = await todoList.getTodo(0);
      expect(completed).to.equal(true);
    });

    it("Should fail when non-owner tries to add task", async function () {
      await expect(
        todoList.connect(addr1).addTodo("Unauthorized Task")
      ).to.be.revertedWith("You are not the owner");
    });
  });
});
