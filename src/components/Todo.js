import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import List from "@material-ui/core/List";
import {makeStyles} from '@material-ui/core/styles';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import './Todo.css';

const useStyles = makeStyles({
    root: {
        maxHeight: "6vh"
    }
});

/**
 *  A function responsible to render the todo object, and has a checkbox, a paragraph and a delete button
 * @param todo
 * @param setTodoCompleted
 * @param removeTodo
 * @returns {JSX.Element}
 * @constructor
 */
function Todo({todo, setTodoCompleted, removeTodo}) {

    const classes = useStyles();

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
        <List>
            <ListItem
                primary={"text"}
                divider={true}
                classes={{root: classes.root}}
                alignItems={"center"}>

                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        icon={<CircleUnchecked/>}
                        checkedIcon={<CircleChecked/>}
                        checked={todo.isChecked}
                        type="checkbox"
                        color="primary"
                        disableRipple
                        onChange={handleCheckboxChange}
                    />
                </ListItemIcon>
                <ListItemText>
                    <p className={"task"}
                       style={{
                           textDecoration: todo.isCompleted === false ? null : "line-through"
                       }}
                    >{todo.task}</p>
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={handleDeleteButtonClick}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
}

export default Todo;
