import React, {useEffect, useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import Todo from "./components/Todo";
import TaskForm from "./components/TaskForm";
import FilterButton from "./components/FilterButton";

//Local to store the values of the to-do list
const LOCAL_STORAGE_KEY = "to-do-list"

/* Defining these constants outside our App() function because
if they were defined inside it, they would be recalculated every time the App
component re-renders, and i don’t want that.
This information will never change no matter what the application does.*/
const FILTER_MAP = {
    All: () => true,
    Active: task => !task.isCompleted,
    Completed: task => task.isCompleted
};
const FILTER_TODOS = Object.keys(FILTER_MAP);

function App() {

    const [todos, setTodo] = useState([]);
    const [filter, setFilter] = useState('All');

    const taskList = todos
        .filter(FILTER_MAP[filter])
        .map(todo => (
            <Todo
                key={todo.id}
                todo={todo}
                setTodoCompleted={setTodoCompleted}
                removeTodo={removeTodo}
            />
        ));

    const filterList = FILTER_TODOS.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}/>
    ));

    useEffect(() => {
        const todosStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (todosStorage) {
            setTodo(todosStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    //adds a to-do to the array of to-dos
    function addTodo(todo) {
        //copia todos os todos existentes e adiciona um novo to-do
        setTodo([...todos, todo]);
    }

    //marca o to-do como concluido
    function setTodoCompleted(id) {
        setTodo(
            todos.map(todo => {
                if (todo.id === id) {
                    return (
                        {
                            ...todo,
                            isCompleted: !todo.isCompleted
                        });
                }
                return todo
            })
        )
    }

    function removeTodo(id) {
        setTodo(todos.filter(todo => todo.id !== id))
    }

    function getTodosLeftCount(todos) {
        return todos.filter(todo => !todo.isCompleted).length + " Items Left";
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
                <div>
                    <div>{getTodosLeftCount(todos)}</div>
                </div>
                <div>
                    <h1>To-Do List</h1>
                    <TaskForm addTodo={addTodo}/>
                    <div
                        role="list"
                        className="todo-list stack-large stack-exception"
                        aria-labelledby="list-heading"
                    >{taskList}
                    </div>

                    <div className="filters btn-group stack-exception">
                        {filterList}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
