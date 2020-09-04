import React from "react";


function Todo({todo, setTodoCompleted, removeTodo}) {

    function handleRemoveClick() {
        removeTodo(todo.id)
    }
    function handleChange(event){
        todo.isChecked = event.target.checked
        setTodoCompleted(todo.id)
        console.log(event.target.value)
    }

    return (
        <div style={{display: "flex"}}>
            <input
                checked={todo.isChecked}
                type="checkbox"
                onChange={handleChange}
            />
            <div style={
                {
                    color: "white",
                    textDecoration: todo.isCompleted === false ? null : "line-through"
                }
            }>{todo.task}</div>
            <button
                onClick={handleRemoveClick}>Delete
            </button>
        </div>
    );
}

export default Todo;
