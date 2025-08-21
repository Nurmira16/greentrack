import React from 'react';
import ActivitySummary from '../components/ActivitySummary';
import GoalList from '../components/GoalList';
import ScheduleList from '../components/ScheduleList';
import Chart from '../components/Chart';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import Todolist from '../components/Todolist';
import SideBarAI from '../components/SideBarAI';
import Expenses from '../components/Expenses';
import Hydration from '../components/Hydration';
import TodoPage from '../components/TodoPage';

const Main = () => {
    return (
        <div>
           <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/todo" element={<Todolist />} />
                <Route path="/todopage" element={<TodoPage />} />
                <Route path="/goals" element={<GoalList />} />
                <Route path="/planner" element={<ScheduleList />} />
                <Route path="/hydration" element={<Hydration />} />
                <Route path="/ai-helper" element={<SideBarAI />} />
                <Route path="/workout" element={<ActivitySummary/>} />
                <Route path="/progress" element={<Chart />} />
           </Routes>
        </div>
    );
};

export default Main;