import React, { useState } from 'react';
import ActivitySummary from '../components/ActivitySummary';
import Todolist from '../components/Todolist';
import '../styles/overview.scss';
import HadithCard from '../components/HadithCard';

const Overview = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [viewMode, setViewMode] = useState('activity'); // 'activity' | 'week' | 'month'

  const dailyHadith = {
    text: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both.",
    reference: "Sahih Muslim"
  };

  const handleSelectActivity = (type) => {
    setSelectedActivity(type);
    setViewMode('activity'); // switch back to activity cards when selecting activity
  };

  return (
    <div className="overview-container">
     <HadithCard hadith={dailyHadith.text} reference={dailyHadith.reference} />

      <div className="overview-content">
        <div className="activity-banner">
          <div className="text-content">
            <h2>
              Track Your Daily Activities
              <span className="underline"></span>
            </h2>
          </div>

          <div className="activity-summary-wrapper">
            <ActivitySummary onSelectActivity={handleSelectActivity} />
          </div>
        </div>


        {/* Todo List */}
        <Todolist/>

      
      </div>
    </div>
  );
};

export default Overview;
