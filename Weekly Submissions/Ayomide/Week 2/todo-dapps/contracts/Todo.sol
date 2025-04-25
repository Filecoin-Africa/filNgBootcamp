// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TodoList {
    address public owner;

    struct TodoItem {
        string task;
        bool completed;
    }

    TodoItem[] private todos;

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor(string[] memory _initialTasks) {
        require(_initialTasks.length >= 5, "At least 5 tasks required");
        owner = msg.sender;
        for (uint i = 0; i < _initialTasks.length; i++) {
            todos.push(TodoItem(_initialTasks[i], false));
        }
    }

    function addTodo(string memory _task) public onlyOwner {
        todos.push(TodoItem(_task, false));
    }

    function markComplete(uint _index) public onlyOwner {
        require(_index < todos.length, "Invalid index");
        todos[_index].completed = true;
    }

    function getTodos() public view returns (TodoItem[] memory) {
        return todos;
    }

    function getTodoCount() public view returns (uint) {
        return todos.length;
    }

    function getTodo(uint _index) public view returns (string memory, bool) {
        require(_index < todos.length, "Invalid index");
        TodoItem memory item = todos[_index];
        return (item.task, item.completed);
    }
}
