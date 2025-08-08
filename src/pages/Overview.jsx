import React, { useState } from 'react';
import ActivitySummary from '../components/ActivitySummary';
import ActivityCard from '../components/ActivityCard';
import Todolist from '../components/Todolist';
import workoutImg from '../assets/workoutImg.avif';
import '../styles/overview.scss';

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Pass this to ActivitySummary to update which ActivityCard shows
  const handleSelectActivity = (type) => {
    setSelectedActivity(type);
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

        {/* Pass callback prop to ActivitySummary */}
        <ActivitySummary onSelectActivity={handleSelectActivity} />

        {/* Show ActivityCard below summary */}
        {selectedActivity && <ActivityCard type={selectedActivity} />}
      </div>

      <div className="right-panel">
        <Todolist />
      </div>
    </div>
  );
};

export default Overview;
