import React, { useState } from 'react';
import ActivitySummary from '../components/ActivitySummary';
import ActivityCard from '../components/ActivityCard';
import Todolist from '../components/Todolist';
import workoutImg from '../assets/workoutImg.avif';
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
      <div className="left-panel">
        <div className="activity-banner">
          <div className="text-content">
            <h1>
              Track Your Daily Activities
              <span className="underline"></span>
            </h1>
            <p>Push harder. Stay stronger. Every day counts.</p>
          </div>
          <div className="image-container">
            <img src={workoutImg} alt="Workout" />
            <div className="overlay" />
          </div>
        </div>
        <ActivitySummary onSelectActivity={handleSelectActivity} />

        
      </div>

      <div className="right-panel">
        <Todolist/>

        {/* Buttons to switch between modes */}
        <div className="view-mode-buttons">
          <button
            className={viewMode === 'activity' ? 'active' : ''}
            onClick={() => setViewMode('activity')}
          >
            Activity Cards
          </button>
          <button
            className={viewMode === 'week' ? 'active' : ''}
            onClick={() => setViewMode('week')}
          >
            Week Plan
          </button>
          <button
            className={viewMode === 'month' ? 'active' : ''}
            onClick={() => setViewMode('month')}
          >
            Month Plan
          </button>
        </div>

        {/* Conditionally render based on viewMode */}
        {viewMode === 'activity' && selectedActivity && (
          <ActivityCard type={selectedActivity} />
        )}

        {(viewMode === 'week' || viewMode === 'month') && (
          <Todolist mode={viewMode} />
        )}
      </div>
    </div>
  );
};

export default Overview;
