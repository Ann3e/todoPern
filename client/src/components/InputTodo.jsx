import { useState } from "react";

const InputTodo = ({ fetchTodos }) => {
  const [description, setDescription] = useState("");

  // Add new todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return; // Prevent empty todos

    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        fetchTodos();
        setDescription("");
      } else {
        console.error("Failed to add todo");
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter todo..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default InputTodo;
