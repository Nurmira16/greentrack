import React, { useState } from 'react';
import Todolist from './Todolist';
import '../styles/todopage.scss';

const TodoPage = () => {
  const [activeTab, setActiveTab] = useState('daily'); // default tab

  return (
    <div className="todo-page-container">
      {/* Tabs */}
      <div className="todo-tabs">
        <button
          className={activeTab === 'daily' ? 'active' : ''}
          onClick={() => setActiveTab('daily')}
        >
          Daily
        </button>
        <button
          className={activeTab === 'week' ? 'active' : ''}
          onClick={() => setActiveTab('week')}
        >
          Weekly
        </button>
        <button
          className={activeTab === 'month' ? 'active' : ''}
          onClick={() => setActiveTab('month')}
        >
          Monthly
        </button>
      </div>

      {/* Content */}
      <div className="todo-tabs-content">
        {activeTab === 'daily' && <Todolist mode={null} />}
        {activeTab === 'week' && <Todolist mode="week" />}
        {activeTab === 'month' && <Todolist mode="month" />}
      </div>
    </div>
  );
};

export default TodoPage;
