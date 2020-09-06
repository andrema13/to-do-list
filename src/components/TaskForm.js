import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Button, SvgIcon} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './TaskForm.css'
import InputBase from "@material-ui/core/InputBase";

/**
 *  A function that is responsible to create a form that contains the submit button
 *  and the text area where the user can input the to-do to the list of todos
 * @param addTodo
 * @returns {JSX.Element}
 * @constructor
 */
function TaskForm({addTodo}) {
    /**
     * An array of todos with the initial state defined
     */
    const [todo, setTodoState] = useState({
        id: "",
        task: "",
        isChecked: false,
        isCompleted: false
    });

    /**
     * Updates the task defined by the user to the todo object
     * @param task to the updated
     */
    function handleTaskInputChange(task) {
        setTodoState({...todo, task: task.target.value})
    }

    /**
     * A function responsible to submit the tasks written by the user and clean tha input text area
     * @param userInput
     */
    function handleSubmitTaskInput(userInput) {
        /*prevent default browser form submit functionality*/
        userInput.preventDefault();
        /** trim -> Removes the leading and trailing white space and line terminator characters from a string. */
        if (todo.task.trim()) {
            addTodo({...todo, id: uuidv4()});
            /*reset task input*/
            setTodoState({...todo, task: ""});
        }
    }

    return (
        <form onSubmit={handleSubmitTaskInput}>
            <Grid
                className={"TaskGrid"}
                container spacing={1} alignItems="flex-end">
                <Grid item>
                    <Button
                        className={"SubmitButton"}
                        type="submit"
                        size="small">
                        <SvgIcon component={ExpandMoreIcon}/>
                    </Button>
                </Grid>
                <Grid item>
                    <InputBase
                        className={"InputTask"}
                        name="task"
                        type="text"
                        inputProps={{'aria-label': 'naked'}}
                        placeholder="What needs to be done?"
                        value={todo.task}
                        /*will do action on everytime the input changes*/
                        onChange={handleTaskInputChange}/>
                </Grid>
            </Grid>
        </form>
    );
}

export default TaskForm;
