const pool = require("../config/db");

// Create a new todo
const createTodo = async (description) => {
  return await pool.query(
    "INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
  );
};

// Get all todos
const getAllTodos = async () => {
  return await pool.query("SELECT * FROM todo");
};

// Get a single todo by ID
const getTodoById = async (id) => {
  return await pool.query("SELECT * FROM todo WHERE _id = $1", [id]);
};

// Update a todo
const updateTodo = async (id, description) => {
  return await pool.query(
    "UPDATE todo SET description = $1 WHERE id = $2",
    [description, id]
  );
};

// Delete a todo
const deleteTodo = async (id) => {
  return await pool.query("DELETE FROM todo WHERE id = $1", [id]);
};

module.exports = { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo };
