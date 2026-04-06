import { useState } from "react";

function ToDoList(){
    const [inputTodos, setInputTodos] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodos = () =>{
        if(inputTodos.trim() === "")return;

        setTodos([...todos, inputTodos]);
        setInputTodos("");
    };
    return(
    <>
    <h1>To Do List</h1>
    <input type="text" placeholder="Tambah Aktifitas" 
    onChange={(e) => setInputTodos(e.target.value)}
    value={inputTodos} />
    <button onClick={addTodos}>Tambah</button>

    <ul>
        {todos.map((item, index) => {
            <li key={index}>{item}</li>;
            // <button onClick="{() => deleteTodo(index)}">Delete</button>;
        })}
    </ul>
    </>
    );
}

export default ToDoList;