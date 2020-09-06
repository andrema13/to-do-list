import React, {useEffect, useState} from 'react';
import './App.css';
import Todo from "./Todo";
import TaskForm from "./TaskForm";
import FilterButton from "./FilterButton";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from "@material-ui/core/List";

//Local to store the values of the to-do list
const LOCAL_STORAGE_KEY = "to-do-list"

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.isCompleted,
    Completed: task => task.isCompleted
};
const FILTER_TODOS = Object.keys(FILTER_MAP);

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        height: 250,
        whiteSpace: 'nowrap',
        overflow: 'auto',
        margin: 4.5
    }
}));

function App() {

    const [todos, setTodo] = useState([]);
    const [filter, setFilter] = useState('All');
    const classes = useStyles();

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
        return todos.filter(todo => !todo.isCompleted).length + " items left";
    }

    return (
        <div className="App">
            <div className="App-header">
                <h1>To-Do List</h1>
                <CssBaseline/>
                <Box
                    className={"AppBox"}
                    display={"flex"}
                    p={1.5}
                    bgcolor="whitesmoke">
                    <div>
                        <TaskForm addTodo={addTodo}/>
                        <List className={classes.root}>
                            {
                                taskList.map((value) => {
                                    return (
                                        <ListItem key={value} role={undefined} dense button>
                                            {value}
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                        <div className="FilterButtons">
                            <div
                                className={"NumberOfTodos"}>{getTodosLeftCount(todos)}</div>
                            <div>{filterList}</div>
                        </div>
                    </div>
                </Box>
                <footer className={"App-footer"}/>
            </div>
        </div>
    );
}

export default App;
