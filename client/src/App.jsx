import React from 'react'
import InputTodo from './components/InputTodo'
import "./App.css";
import ListTodo from './components/ListTodo';
import EditTodo from './components/EditTodo';
const App = () => {
  return (
    <div >
      <InputTodo/>
      <ListTodo/>
      {/* <EditTodo/> */}
    </div>
  )
}

export default App