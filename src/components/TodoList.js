import React from "react";
import Todo from "./Todo";

function TodoList({todos, setTodoCompleted, removeTodo}) {
    return(
        <ul>{
            todos.map(todo =>(
                <Todo
                    key={todo.id}
                    todo={todo}
                    setTodoCompleted={setTodoCompleted}
                    removeTodo={removeTodo}
                />
            ))
        }</ul>
    );
}

export default TodoList;
