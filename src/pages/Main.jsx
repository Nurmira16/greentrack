import React from 'react';
import ActivitySummary from '../components/ActivitySummary';
import GoalList from '../components/GoalList';
import ScheduleList from '../components/ScheduleList';
import Chart from '../components/Chart';
import { Route, Routes } from 'react-router';
import Overview from './Overview';
import DietPlanPage from './DietPlanPage';

const Main = () => {
    return (
        <div>
           <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/workout" element={<ActivitySummary/>} />
                <Route path="/diet-plan" element={<DietPlanPage />} />
                <Route path="/goals" element={<GoalList />} />
                <Route path="/schedule" element={<ScheduleList />} />
                <Route path="/progress" element={<Chart />} />
           </Routes>
        </div>
    );
};

export default Main;