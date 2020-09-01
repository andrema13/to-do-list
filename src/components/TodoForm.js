import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoForm({addTodo}){
    const [todo, setTodoState] = useState({
        id: "",
        task:"",
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
            <input
                name="task"
                type="text"
                value = {todo.task}
                /*will do action on everytime the input changes*/
                onChange={handleTaskInputChange}/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default TodoForm;
