import React, { useState, useEffect } from 'react';
import '../styles/expenses.scss';
import supabase from '../supabaseClient';
import { FaTrash } from 'react-icons/fa';

const categoryList = ['food', 'transport', 'gifts', 'rent', 'extra'];

const getCategoryGradient = (category) => {
  const gradients = {
    food: 'linear-gradient(135deg, #E76F51, #F4A261)',
    transport: 'linear-gradient(135deg, #6C63FF, #9D7CFC)',
    gifts: 'linear-gradient(135deg, #FFB703, #FFD166)',
    rent: 'linear-gradient(135deg, #F4A261, #E9C46A)',
    extra: 'linear-gradient(135deg, #2A9D8F, #43BCCD)'
  };
  return gradients[category] || '#264653';
};

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'food', date: '' });

  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [viewYear, setViewYear] = useState(currentYear);

  useEffect(() => {
    fetchExpenses();
  }, [viewMonth, viewYear]);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .gte('date', `${viewYear}-${String(viewMonth).padStart(2, '0')}-01`)
      .lte('date', `${viewYear}-${String(viewMonth).padStart(2, '0')}-31`);
    if (!error) setExpenses(data);
  };

  const addExpense = async () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.date) return;

    const expenseToInsert = { 
      ...newExpense, 
      amount: parseFloat(newExpense.amount) 
    };

    const expenseDate = new Date(newExpense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();

    const { data: insertedData, error: insertError } = await supabase
      .from('expenses')
      .insert([expenseToInsert])
      .select();

    if (insertError) {
      console.error(insertError);
      return;
    }
    if (!insertedData || insertedData.length === 0) return;

    const insertedExpense = insertedData[0];

    const { data: currentHistory, error: fetchError } = await supabase
      .from('monthly_expense_history')
      .select('id, total')
      .eq('month', expenseMonth)
      .eq('year', expenseYear)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error(fetchError);
    }

    if (currentHistory) {
      const newTotal = currentHistory.total + expenseToInsert.amount;
      await supabase
        .from('monthly_expense_history')
        .update({ total: newTotal })
        .eq('id', currentHistory.id);
    } else {
      await supabase
        .from('monthly_expense_history')
        .insert([
          {
            month: expenseMonth,
            year: expenseYear,
            total: expenseToInsert.amount
          }
        ]);
    }

    if (expenseMonth === viewMonth && expenseYear === viewYear) {
      setExpenses([...expenses, insertedExpense]);
    }

    setNewExpense({ title: '', amount: '', category: 'food', date: '' });
  };

  const deleteExpense = async (id, category, amount, date) => {
    const expenseDate = new Date(date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete Error:", error);
      return;
    }

    setExpenses(expenses.filter(e => e.id !== id));

    const { data: currentMonthTotal } = await supabase
      .from('monthly_expense_history')
      .select('*')
      .eq('month', expenseMonth)
      .eq('year', expenseYear)
      .single();

    if (currentMonthTotal) {
      const newTotal = currentMonthTotal.total - amount;
      await supabase
        .from('monthly_expense_history')
        .update({ total: newTotal >= 0 ? newTotal : 0 })
        .eq('id', currentMonthTotal.id);
    }
  };

  const categoryTotals = categoryList.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return acc;
  }, {});

  const monthlyTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <div className="expenses-container">
      <h2>Expense Tracker</h2>

      <div className="expense-form">
        <input
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={e => setNewExpense({ ...newExpense, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <input
          type="date"
          value={newExpense.date}
          onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
        />
        <select
          value={newExpense.category}
          onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
        >
          {categoryList.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={addExpense}>Add</button>
      </div>

      {/* Category Cards */}
      <div className="category-cards">
        {categoryList.map(cat => (
          <div
            key={cat}
            className="category-card"
            style={{ background: getCategoryGradient(cat) }}
          >
            <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
            <p className="amount">{categoryTotals[cat].toFixed(2)} zł</p>
          </div>
        ))}
      </div>

      <div className="monthly-expenses">
        <div className="month-navigation">
          <button onClick={() => {
            if (viewMonth === 1) {
              setViewMonth(12);
              setViewYear(viewYear - 1);
            } else {
              setViewMonth(viewMonth - 1);
            }
          }}>
            &lt; Prev
          </button>

          <span>{viewMonth}/{viewYear}</span>

          <button onClick={() => {
            if (viewMonth === 12) {
              setViewMonth(1);
              setViewYear(viewYear + 1);
            } else {
              setViewMonth(viewMonth + 1);
            }
          }}>
            Next &gt;
          </button>
        </div>

        <h3>
        {monthNames[viewMonth - 1]} {viewYear}: {monthlyTotal.toFixed(2)} zł
      </h3>

        {expenses.length === 0 && <p>No expenses yet this month.</p>}

        {expenses.map(e => (
          <div key={e.id} className="expense-row">
            <span>
              {e.title} ({e.category}) - {e.amount.toFixed(2)} zł - {e.date}
            </span>
            <button onClick={() => deleteExpense(e.id, e.category, e.amount, e.date)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
