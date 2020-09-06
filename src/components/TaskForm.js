import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Button, SvgIcon} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './TaskForm.css'
import InputBase from "@material-ui/core/InputBase";

function TaskForm({addTodo}){
    const [todo, setTodoState] = useState({
        id: "",
        task:"",
        isChecked: false,
        isCompleted: false
    });

    //update the task on our to-do object
    function handleTaskInputChange(e){
        setTodoState({...todo, task: e.target.value})
    }

    function handleSubmit(e){
        //prevent default browser form submit functionality
        e.preventDefault();
        /** trim -> Removes the leading and trailing white space and line terminator characters from a string. */
        if(todo.task.trim()){
            addTodo({...todo, id: uuidv4()});
            //reset task input
            setTodoState({...todo, task: ""});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        inputProps={{ 'aria-label': 'naked' }}
                        placeholder="What needs to be done?"
                        value = {todo.task}
                        /*will do action on everytime the input changes*/
                        onChange={handleTaskInputChange}/>
                </Grid>
            </Grid>


        </form>
    );
}

export default TaskForm;
