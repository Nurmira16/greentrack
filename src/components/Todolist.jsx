import React, { useEffect, useState } from 'react';
import { FaEdit, FaCheck, FaTrash } from 'react-icons/fa';
import '../styles/todolist.scss';
import supabase from '../supabaseClient';
import mascot from '../assets/loading_mascot.png';

const Todolist = ({ mode }) => {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [todos, setTodos] = useState([]);



  // Fetch todos when component mounts or mode changes
  useEffect(() => {
    getTodos();
  }, [mode]);

  // Fetch todos filtered by mode
  const getTodos = async () => {
    try {
      let query = supabase.from('todos').select();
  
      if (mode === 'week') {
        query = query.eq('mode', 'week');
      } else if (mode === 'month') {
        query = query.eq('mode', 'month');
      } else {
        query = query.eq('mode', 'day'); // daily todos
      }
  
      const { data, error } = await query;
      if (error) throw error;
  
      // Sort incomplete first, then completed
      const sorted = data.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
  
      setTodos(sorted); // set the todos state
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  
  // Add a new todo
  const addTodo = async () => {
    if (input.trim() === '') return;
  
    try {
      const todoMode = mode || 'day'; // default to 'day' instead of null
      const { error } = await supabase
        .from('todos')
        .insert([{ task: input.trim(), mode: todoMode, completed: false }]);
  
      if (error) throw error;
  
      setInput('');
      await getTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  

  // Delete todo by id
  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id);
      if (error) throw error;
      await getTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Update todo task text
  const editTodo = async (id, newTask) => {
    if (newTask.trim() === '') return;

    try {
      const { error } = await supabase.from('todos').update({ task: newTask.trim() }).eq('id', id);
      if (error) throw error;
      setEditingId(null);
      setEditValue('');
      await getTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Toggle complete/incomplete
  const toggleComplete = async (id, completed) => {
    try {
      const { error } = await supabase.from('todos').update({ completed: !completed }).eq('id', id);
      if (error) throw error;
      await getTodos();
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.task);
  };

  return (
    <div className="todolist-container">
      <div className="todolist-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todolist-input"
          placeholder={`Add new ${mode || 'daily'} todo`}
        />
        <button onClick={addTodo} className="todolist-button">
          Add
        </button>
      </div>

      <div className="todolist-output">
        {todos.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks yet</p>
            <img src={mascot} alt="Loading mascot" className="loading-mascot" />
          </div>
        ) : (
          <ul className="todolist-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todolist-item ${todo.completed ? 'completed' : ''}`}>
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => editTodo(todo.id, editValue)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') editTodo(todo.id, editValue);
                    }}
                    className="edit-input"
                    autoFocus
                  />
                ) : (
                  <span className="todo-text">{todo.task}</span>
                )}

                <div className="todo-actions">
                  <button
                    onClick={() => toggleComplete(todo.id, todo.completed)}
                    className={`action-btn complete-btn ${todo.completed ? 'completed' : ''}`}
                    aria-label={`Mark ${todo.completed ? 'incomplete' : 'complete'}`}
                    title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => startEdit(todo)}
                    className="action-btn edit-btn"
                    aria-label="Edit todo"
                    title="Edit todo"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="action-btn delete-btn"
                    aria-label="Delete todo"
                    title="Delete todo"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todolist;
