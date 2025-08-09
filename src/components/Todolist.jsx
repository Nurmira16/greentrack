import React, { useEffect, useState } from 'react';
import '../styles/todolist.scss';
import supabase from '../supabaseClient';

const Todolist = ({ mode }) => {
  const [input, setInput] = useState('');
  const [weekTodos, setWeekTodos] = useState([]);
  const [monthTodos, setMonthTodos] = useState([]);
  const [noModeTodos, setNoModeTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [mode]); // refetch when mode changes

  const getTodos = async () => {
    let query = supabase.from('todos').select();

    if (mode) {
      query = query.eq('mode', mode); // filter by mode if provided
    } else {
      query = query.is('mode', null); // for no mode todos
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching todos:', error);
      return;
    }

    if (mode === 'week') {
      setWeekTodos(data.map((t) => t.task));
    } else if (mode === 'month') {
      setMonthTodos(data.map((t) => t.task));
    } else {
      setNoModeTodos(data.map((t) => t.task));
    }
  };


const  addTodo = async () => {
    if (input.trim() === '') return;

    // Insert new todo into the table with mode
    const { error } = await supabase
      .from('todos')
      .insert([{ task: input.trim(),mode }]);

    if (error) {
      console.error("Error adding todo:", error);
      return;
    }

    
    setInput('');
    await getTodos()
    console.log(monthTodos)
  };

  const deleteTodo = async(index) => {
    const todosList = mode === 'week'
      ? weekTodos
      : mode === 'month'
      ? monthTodos
      : noModeTodos;

    const taskToDelete = todosList[index];

    let query = supabase.from('todos').delete().eq('task', taskToDelete);

    if (mode) {
      query = query.eq('mode', mode);
    } else {
      query = query.is('mode', null);
    }

    const { error } = await query;


    if (error) {
      console.error('Error deleting todo:', error);
      return;
    }

    // Refresh after delete
    await getTodos();
  };

  

  const todos = mode === 'week' ? weekTodos : mode==='month'?monthTodos:noModeTodos;

  return (
    <div className="todolist-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todolist-input"
        placeholder={`Add new ${mode} todo`}
      />
      <button onClick={addTodo} className="todolist-button">
        Add
      </button>

      <div className="todolist-output">
        <ul className="todolist-list">
          {todos.map((todo, index) => (
            <li key={index} className="todolist-item">
              {todo}
              <button
                onClick={() => deleteTodo(index)}
                className="todolist-delete-btn"
                aria-label={`Delete todo ${todo}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
