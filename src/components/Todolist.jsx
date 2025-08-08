import React, { useState } from 'react';

const Todolist = () => {
    const [input,setInput]=useState('')
    const [todos,setTodos]=useState([])

    const addTodo=()=>{
        setTodos([...todos,input.trim()])
        setInput('')
        console.log(todos)
    }
    const deleteTodo=(todo)=>{
        setTodos(todos.filter((_,i)=>i!==todo))
        console.log(todos)
    }
    return (
        <div>
            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
            <button onClick={addTodo}>add</button>
            
            <div className="output">
                <ul>
                {todos.map((todo,id)=>(
                    <>
                    <li id={id}>{todo}</li>
                    <button onClick={()=>deleteTodo(id)}>delete</button>
                    </>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default Todolist;