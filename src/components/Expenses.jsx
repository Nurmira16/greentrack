import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/expenses.scss';
import mascot from '../assets/loading_mascot.png'


const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Grocery Shopping', amount: 85.50, category: 'food', date: '2024-01-15' },
    { id: 2, title: 'Gym Membership', amount: 45.00, category: 'fitness', date: '2024-01-10' },
    { id: 3, title: 'Transportation', amount: 120.00, category: 'transport', date: '2024-01-12' }
  ]);
  
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: ''
  });
  
  const [editingId, setEditingId] = useState(null);

  const addExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.date) {
      const expense = {
        id: Date.now(),
        ...newExpense,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ title: '', amount: '', category: 'food', date: '' });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setNewExpense({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date
    });
  };

  const saveEdit = () => {
    if (editingId && newExpense.title && newExpense.amount && newExpense.date) {
      setExpenses(expenses.map(expense => 
        expense.id === editingId 
          ? { ...expense, ...newExpense, amount: parseFloat(newExpense.amount) }
          : expense
      ));
      setEditingId(null);
      setNewExpense({ title: '', amount: '', category: 'food', date: '' });
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: 'var(--accent-red)',
      fitness: 'var(--accent-teal)',
      transport: 'var(--primary-purple)',
      entertainment: 'var(--primary-yellow)',
      health: 'var(--primary-orange)'
    };
    return colors[category] || 'var(--accent-dark)';
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h1 className="expenses-title">Expense Tracker</h1>
        <p className="expenses-subtitle">Track your spending and stay on budget</p>
        <div className="total-expenses">
          <span className="total-label">Total:</span>
          <span className="total-amount">${totalExpenses.toFixed(2)}</span>
        </div>
      </div>

      <div className="expense-form">
        <div className="form-row">
          <input
            type="text"
            value={newExpense.title}
            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
            placeholder="Expense title..."
            className="expense-input"
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount"
            className="expense-input"
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-row">
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="category-select"
          >
            <option value="food">Food</option>
            <option value="fitness">Fitness</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
          </select>
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            className="expense-input"
          />
        </div>
        <button 
          onClick={editingId ? saveEdit : addExpense} 
          className="expense-btn"
        >
          {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>

      <div className="expenses-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div className="expense-main">
                <h3 className="expense-title">{expense.title}</h3>
                <span className="expense-date">{expense.date}</span>
              </div>
              <div className="expense-details">
                <span 
                  className="expense-category"
                  style={{ backgroundColor: getCategoryColor(expense.category) }}
                >
                  {expense.category}
                </span>
                <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              </div>
            </div>
            <div className="expense-actions">
              <button 
                onClick={() => startEdit(expense)}
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button 
                onClick={() => deleteExpense(expense.id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {expenses.length === 0 && (
        <div className="empty-state">
          <p>No expenses yet. Add your first expense to get started!</p>
          <img 
            src={mascot}
            alt="Loading mascot" 
            className="loading-mascot"
          />
        </div>
      )}
    </div>
  );
};

export default Expenses;
