import React from "react";


function Todo({todo, setTodoCompleted, removeTodo}) {

    function handleCheckboxClick(){
        setTodoCompleted(todo.id)
    }
    function handleRemoveClick(){
        removeTodo(todo.id)
    }

    return (
        <div style={{display: "flex"}}>

            <li style={
                {
                    color: "white"
                }
            }>{todo.task}</li>
            <input type="checkbox" onClick={handleCheckboxClick}/>
            <button onClick={handleRemoveClick}>Delete</button>
        </div>

    );
}

export default Todo;
