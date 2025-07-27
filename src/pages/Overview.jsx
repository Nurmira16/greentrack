import React from 'react';
import ActivitySummary from '../components/ActivitySummary';
import '../styles/overview.scss';
import workoutImg from '../assets/workoutImg.avif'
import ActivityCard from '../components/ActivityCard';

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="left-panel">
      <div className="activity-banner">
          <div className="text-content">
            <h1>Track Your Daily Activities</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea facere animi, quisquam mollitia maiores assumenda eligendi aspernatur alias culpa.</p>
          </div>
          <div className="image-container">
          <img src={workoutImg} alt="Workout" />
          <div className="overlay" />
        </div>
        </div>
        <ActivitySummary />
        <ActivityCard/>
      </div>
      <div className="right-panel">
        {/* Right widgets here */}
      </div>
    </div>
  );
};

export default Overview;
