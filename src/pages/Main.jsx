import React from 'react';
import ActivitySummary from '../components/ActivitySummary';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import Todolist from '../components/Todolist';
import SideBarAI from '../components/SideBarAI';
import Expenses from '../components/Expenses';
import TodoPage from '../components/TodoPage';

const Main = () => {
    return (
        <div>
           <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/todo" element={<Todolist />} />
                <Route path="/todopage" element={<TodoPage />} />
                <Route path="/ai-helper" element={<SideBarAI />} />
                <Route path="/workout" element={<ActivitySummary/>} />

           </Routes>
        </div>
    );
};

export default Main;