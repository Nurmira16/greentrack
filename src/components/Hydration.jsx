import React, { useState, useEffect } from 'react';
import { FaTint, FaPlus, FaMinus } from 'react-icons/fa';
import { FaGlassWater } from 'react-icons/fa6';

import '../styles/hydration.scss';

const Hydration = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    // Load today's intake from localStorage
    const today = new Date().toDateString();
    const savedIntake = localStorage.getItem(`hydration_${today}`);
    if (savedIntake) {
      setWaterIntake(parseInt(savedIntake));
    }
    
    // Load intake history
    const savedHistory = localStorage.getItem('hydration_history');
    if (savedHistory) {
      setIntakeHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addWater = (amount) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    
    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`hydration_${today}`, newIntake.toString());
    
    // Add to history
    const historyEntry = {
      id: Date.now(),
      amount,
      timestamp: new Date().toISOString(),
      date: today
    };
    
    const updatedHistory = [...intakeHistory, historyEntry];
    setIntakeHistory(updatedHistory);
    localStorage.setItem('hydration_history', JSON.stringify(updatedHistory));
  };

  const removeWater = (amount) => {
    const newIntake = Math.max(0, waterIntake - amount);
    setWaterIntake(newIntake);
    
    const today = new Date().toDateString();
    localStorage.setItem(`hydration_${today}`, newIntake.toString());
  };

  const updateDailyGoal = () => {
    if (newGoal && newGoal > 0) {
      setDailyGoal(parseInt(newGoal));
      setShowGoalModal(false);
      setNewGoal('');
    }
  };

  const getProgressPercentage = () => {
    return Math.min((waterIntake / dailyGoal) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return 'var(--accent-teal)';
    if (percentage >= 70) return 'var(--primary-yellow)';
    if (percentage >= 40) return 'var(--primary-orange)';
    return 'var(--accent-red)';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="hydration-container">
      <div className="hydration-header">
        <h1 className="hydration-title">Hydration Tracker</h1>
        <p className="hydration-subtitle">Stay hydrated throughout the day</p>
      </div>

      <div className="hydration-main">
        <div className="water-progress">
          <div className="progress-circle">
            <div 
              className="progress-fill"
              style={{ 
                background: `conic-gradient(${getProgressColor()} ${getProgressPercentage() * 3.6}deg, var(--secondary-light) 0deg)` 
              }}
            >
              <div className="progress-center">
                <FaGlassWater className="water-icon" />
                <span className="current-intake">{waterIntake}ml</span>
                <span className="daily-goal">/ {dailyGoal}ml</span>
              </div>
            </div>
          </div>
          
          <div className="progress-info">
            <div className="progress-percentage">
              {Math.round(getProgressPercentage())}%
            </div>
            <div className="progress-status">
              {getProgressPercentage() >= 100 ? 'Goal Achieved! 🎉' : 'Keep going!'}
            </div>
          </div>
        </div>

        <div className="water-controls">
          <h3>Quick Add/Remove</h3>
          <div className="control-buttons">
            <button 
              onClick={() => addWater(250)}
              className="control-btn add-btn"
            >
              <FaPlus />
              <span>250ml</span>
            </button>
            <button 
              onClick={() => addWater(500)}
              className="control-btn add-btn"
            >
              <FaPlus />
              <span>500ml</span>
            </button>
            <button 
              onClick={() => removeWater(250)}
              className="control-btn remove-btn"
            >
              <FaMinus />
              <span>250ml</span>
            </button>
          </div>
        </div>

        <div className="goal-section">
          <div className="goal-header">
            <h3>Daily Goal</h3>
            <button 
              onClick={() => setShowGoalModal(true)}
              className="edit-goal-btn"
            >
              Edit
            </button>
          </div>
          <div className="current-goal">
            <FaTint className="goal-icon" />
            <span>{dailyGoal}ml per day</span>
          </div>
        </div>
      </div>

      <div className="intake-history">
        <h3>Today's Intake</h3>
        <div className="history-list">
          {intakeHistory
            .filter(entry => entry.date === new Date().toDateString())
            .map(entry => (
              <div key={entry.id} className="history-item">
                <div className="history-time">{formatTime(entry.timestamp)}</div>
                <div className="history-amount">+{entry.amount}ml</div>
              </div>
            ))}
        </div>
        
        {intakeHistory.filter(entry => entry.date === new Date().toDateString()).length === 0 && (
          <div className="empty-history">
            <p>No water intake recorded today. Start drinking water!</p>
            <img 
              src="/src/assets/loading_mascot.png" 
              alt="Loading mascot" 
              className="loading-mascot"
            />
          </div>
        )}
      </div>

      {showGoalModal && (
        <div className="modal-overlay" onClick={() => setShowGoalModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Update Daily Goal</h3>
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter new goal in ml"
              className="goal-input"
              min="500"
              max="5000"
            />
            <div className="modal-actions">
              <button 
                onClick={() => setShowGoalModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={updateDailyGoal}
                className="save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hydration;
