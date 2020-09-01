import React from "react";


function Todo({todo}) {

    return (
        <div style={{display: "flex"}}>

            <li style={
                {
                    color: "white"
                }
            }>{todo.task}</li>
            <input type="checkbox"/>
            <button>Delete</button>
        </div>

    );
}

export default Todo;
