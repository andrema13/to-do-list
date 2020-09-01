import React, {useState} from "react";


function Todo({todo}) {

    return (
        <div style={{display: "flex"}}>
            <input type="checkbox"/>
            <li style={
                {
                    color: "white",
                    textDecoration: todo.completed ? "line-through": null
                }
            }>{todo.task}</li>
            <button>Delete</button>
        </div>

    );
}

export default Todo;
