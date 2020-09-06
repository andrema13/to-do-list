import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import './Todo.css';

/**
 *  A function responsible to render the todo object, and has a checkbox, a paragraph and a delete button
 * @param todo
 * @param setTodoCompleted
 * @param removeTodo
 * @returns {JSX.Element}
 * @constructor
 */
function Todo({todo, setTodoCompleted, removeTodo}) {

    /**
     * Handles when the user clicks on the button to delete a todo
     */
    function handleDeleteButtonClick() {
        removeTodo(todo.id)
    }

    /**
     * Handles when the checkbox changes his state, that is, the todo isCompleted state changes to
     * @param event when the user click on the checkbox
     */
    function handleCheckboxChange(event) {
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
                onChange={handleCheckboxChange}
            />
            <p className={"Task"} style={
                {
                    textDecoration: todo.isCompleted === false ? null : "line-through"
                }
            }>{todo.task}</p>
            <IconButton
                className={"DeleteButton"}
                aria-label="delete"
                onClick={handleDeleteButtonClick}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
}

export default Todo;
