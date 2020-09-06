import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import './Todo.css';

function Todo({todo, setTodoCompleted, removeTodo}) {

    function handleRemoveClick() {
        removeTodo(todo.id)
    }

    function handleChange(event) {
        todo.isChecked = event.target.checked
        setTodoCompleted(todo.id)
    }

    return (
        <ListItem className={"TaskList"}>
            <Checkbox
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />}
                checked={todo.isChecked}
                type="checkbox"
                color="primary"
                onChange={handleChange}
            />
            <p className={"Task"} style={
                {
                    textDecoration: todo.isCompleted === false ? null : "line-through"
                }
            }>{todo.task}</p>
            <IconButton
                className={"DeleteButton"}
                aria-label="delete"
                onClick={handleRemoveClick}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
}

export default Todo;
