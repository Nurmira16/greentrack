import React, { useState } from 'react';
import ActivitySummary from '../components/ActivitySummary';
import ActivityCard from '../components/ActivityCard';
import Todolist from '../components/Todolist';
import '../styles/overview.scss';

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [viewMode, setViewMode] = useState('activity'); // 'activity' | 'week' | 'month'

  const handleSelectActivity = (type) => {
    setSelectedActivity(type);
    setViewMode('activity'); // switch back to activity cards when selecting activity
  };

  return (
    <div className="overview-container">
      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome Back!</h1>
          <p className="welcome-subtitle">Ready to crush your fitness goals today?</p>
        </div>
        <div className="welcome-avatar">
          <div className="avatar-placeholder">👋</div>
        </div>
      </div>

      <div className="overview-content">
        {/* Activity Banner */}
        <div className="activity-banner">
          <div className="text-content">
            <h2>
              Track Your Daily Activities
              <span className="underline"></span>
            </h2>
            <p>Push harder. Stay stronger. Every day counts.</p>
          </div>
        </div>

        {/* Activity Summary */}
        <ActivitySummary onSelectActivity={handleSelectActivity} />

        {/* Todo List */}
        <Todolist/>

      
      </div>
    </div>
  );
};

export default Overview;
