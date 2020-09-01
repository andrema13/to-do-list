import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  const [todos, setTodoState] = useState([])

    //adds a to-do to the array of to-dos
    function addTodo(todo){
        setTodoState([todo, ...todos]);
    }
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React
        </a>*/}
        <h1>To-Do List</h1>
          <TodoForm addTodo={addTodo}/>
          <TodoList todos={todos}/>
      </header>
    </div>
  );
}

export default App;
