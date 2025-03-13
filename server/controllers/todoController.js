const Todo = require("../models/todoModel");

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await Todo.createTodo(description);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all todos
const getTodos = async (req, res) => {

  try {
    const allTodos = await Todo.getAllTodos();
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a single todo
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.getTodoById(id);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await Todo.updateTodo(id, description);
    res.json({ message: "Todo was updated!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.deleteTodo(id);
    res.json({ message: "Todo was deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
