import React, {useEffect, useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

//Local to store the values of the to-do list
const LOCAL_STORAGE_KEY = "to-do-list"

function App() {

    const [todos, setTodoState] = useState([]);

    useEffect(() => {
        const todosStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (todosStorage) {
            setTodoState(todosStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    //adds a to-do to the array of to-dos
    function addTodo(todo) {
        setTodoState([todo, ...todos]);
    }

    function setTodoCompleted(id) {
        setTodoState(
            todos.map(todo =>{
                if(todo.id === id ){
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted
                    };
                }
                return todo
            })
        );
    }

    function removeTodo(id){
        setTodoState(todos.filter(todo => todo.id !== id))
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
                <TodoList
                    todos={todos}
                    setTodoCompleted={setTodoCompleted}
                    removeTodo={removeTodo}/>
            </header>
        </div>
    );
}

export default App;
