// import { useState, useEffect } from "react";
// import EditTodo from "./EditTodo";

// const ListTodo = () => {
//   const [todos, setTodos] = useState([]);

//   // Fetch Todos
//   const fetchTodos = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/todos");
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const jsonData = await response.json();
//       setTodos(jsonData);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
  

//   // Delete a todo
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/todos/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setTodos(todos.filter((todo) => todo.id !== id));
//       } else {
//         console.error("Failed to delete");
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="todo-container">
//       <h2>Pern Todo List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Description</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {todos.map((todo) => (
//             <tr key={todo.id}> {/* Ensure "id" is unique */}
//               <td>{todo.description}</td>
//               <td>
//                 <EditTodo todo={todo} fetchTodos={fetchTodos} />
//               </td>
//               <td>
//                 <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListTodo;


import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h2>Pern Todo List</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}> {/* Ensure "id" is unique */}
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo}  />
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
