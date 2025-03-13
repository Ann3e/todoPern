import { useState } from "react";

const EditTodo = ({ todo, fetchTodos }) => {
  const [description, setDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  // Update todo
  const handleUpdate = async () => {
    try {
    const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchTodos();
        setIsEditing(false);
      } else {
        console.error("Failed to update");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default EditTodo;
