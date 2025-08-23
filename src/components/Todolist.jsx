import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import '../styles/todolist.scss';
import mascot from '../assets/loading_mascot.png';

const Todolist = ({ mode }) => {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => { getTodos(); }, [mode]);

  const getTodos = async () => {
    try {
      let query = supabase.from('todos').select();
      query = mode ? query.eq('mode', mode) : query.eq('mode', 'day');
      const { data, error } = await query;
      if (error) throw error;
      const sorted = data.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
      setTodos(sorted);
    } catch (err) { console.error(err); }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await supabase.from('todos').insert([{ task: input.trim(), mode: mode || 'day', completed: false }]);
      setInput('');
      getTodos();
    } catch (err) { console.error(err); }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from('todos').delete().eq('id', id);
      getTodos();
    } catch (err) { console.error(err); }
  };

  const editTodo = async (id, newTask) => {
    if (!newTask.trim()) return;
    try {
      await supabase.from('todos').update({ task: newTask.trim() }).eq('id', id);
      setEditingId(null);
      setEditValue('');
      getTodos();
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await supabase.from('todos').update({ completed: !completed }).eq('id', id);
      getTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.task);
  };

  return (
    <section className="todolist-container">
      <header className="todolist-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Add new ${mode || 'daily'} todo`}
          className="todolist-input"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="todolist-add-btn" onClick={addTodo}>+</button>
      </header>

      {todos.length === 0 ? (
        <p className="no-tasks">No tasks yet <img src={mascot} alt="Mascot" /></p>
      ) : (
        <ul className="todolist-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todolist-item ${todo.completed ? 'completed' : ''}`}>
              {/* Circle bullet for marking complete */}
              <span 
                className={`todo-bullet ${todo.completed ? 'done' : ''}`} 
                onClick={() => toggleComplete(todo.id, todo.completed)}
              ></span>

              {/* Todo text */}
              {editingId === todo.id ? (
                <input
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => editTodo(todo.id, editValue)}
                  onKeyDown={(e) => e.key === 'Enter' && editTodo(todo.id, editValue)}
                  autoFocus
                />
              ) : (
                <span 
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => startEdit(todo)}
                >
                  {todo.task}
                </span>
              )}

              {/* Delete button */}
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Todolist;
