import React from 'react';
import ActivitySummary from '../components/ActivitySummary';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import Todolist from '../components/Todolist';
import Expenses from '../components/Expenses';
import TodoPage from '../components/TodoPage';
import Profile from '../components/Profile';

const Main = ({ user }) => {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Overview user={user} />} />
          <Route path="/expenses" element={<Expenses user={user} />} />
          <Route path="/todo" element={<Todolist user={user} />} />
          <Route path="/todopage" element={<TodoPage user={user} />} />
          <Route path="/workout" element={<ActivitySummary user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />


        </Routes>
      </div>
    );
  };
  

export default Main;