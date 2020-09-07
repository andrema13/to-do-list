import React, {useEffect, useState} from 'react';
import './App.css';
import Todo from "./Todo";
import TaskForm from "./TaskForm";
import FilterButton from "./FilterButton";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from "@material-ui/core/List";
import {Paper} from '@material-ui/core';
import {v4 as UUID} from 'uuid';

/**
 * Local to store the values of the to-do list
 */
const LOCAL_STORAGE_KEY = "to-do-list"

/**
 * A filter map that is responsible to filter the tasks active, completed or show all tasks
 * @type {{All: (function(): boolean), Active: (function(*): *), Completed: (function(*): *)}}
 */
const FILTER_MAP = {
    All: () => true,
    Active: task => !task.isCompleted,
    Completed: task => task.isCompleted
};
/**
 * Stores the tasks filtered
 * @type {string[]}
 */
const FILTER_TODOS = Object.keys(FILTER_MAP);
/**
 * Style to apply to the list of tasks
 * @type {(props?: any) => ClassNameMap<"root">}
 */
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflow: 'auto',
        margin: 4.5,
        width: "inherit !important"
    }
}));

/**
 * Root of the app that renders a view that shows the application
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    /**
     * An array that stores the todos
     */
    const [todos, setTodo] = useState([]);
    /**
     * An array that stores the filter and the initial state is all,
     * here its possible to set the initial state to completed or active too
     */
    const [filter, setFilter] = useState('All');
    /**
     * A constant when its called gonna use the styles defined above
     * @type {classes<"root">}
     */
    const classes = useStyles();

    /**
     * An array that stores the todos, filtered or with all todos
     * @type {unknown[]}
     */
    const todoList = todos
        .filter(FILTER_MAP[filter])
        .map(todo => (
            <Todo
                key={todo.id}
                todo={todo}
                setTodoCompleted={setTodoCompleted}
                removeTodo={removeTodo}
            />
        ));

    /**
     * Array with the filters present on the FILTER_TODOS constant
     * @type {unknown[]}
     */
    const filterList = FILTER_TODOS.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}/>
    ));

    /**
     * Gets the todos present on the Local Storage on the browser
     */
    useEffect(() => {
        const todosStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (todosStorage) {
            setTodo(todosStorage)
        }
    }, [])

    /**
     * Sets the items returned from the browser and converts the Javascript values received to a Json String
     */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos]);

    /**
     * Adds a todo to the array 'todos'
     * @param todo to be added to the array of todos
     */
    function addTodo(todo) {
        setTodo([...todos, todo]);
    }

    /**
     * Sets a todo to completed, if the isCompleted value is false , turns true and vice-versa
     * @param id the todo's id to be set as completed
     */
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

    /**
     * Removes a todo from the list with the given todo's id
     * @param id of the todo to be removed
     */
    function removeTodo(id) {
        setTodo(todos.filter(todo => todo.id !== id))
    }

    /**
     * Gets the value of the todos that isn't completed
     * @param todos array
     * @returns {string} the value of the todos plus a string
     */
    function getTodosLeftCount(todos) {
        return todos.filter(todo => !todo.isCompleted).length + " items left";
    }

    return (
        <div className="container">
            <h1 className={"title"}>todos</h1>
            <CssBaseline/>
            <Paper
                elevation={4}
                style={{
                    marginBottom: "8px"
                }}
                bgcolor="whitesmoke">
                <TaskForm addTodo={addTodo}/>
            </Paper>
            <Paper
                elevation={4}
                bgcolor="whitesmoke">
                <List className={classes.root}>
                    {
                        todoList.map((value) => {
                            return (
                                <ListItem key={UUID()} role={undefined} dense button>
                                    {value}
                                </ListItem>
                            )
                        })
                    }
                </List>
                <div className={"bottom-container"}>
                    <div>{getTodosLeftCount(todos)}</div>
                    <div className={"bottom-child"}>{filterList}</div>
                </div>
            </Paper>
        </div>

    );
}

export default App;
