import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWorkoutHours, setCalories, setSteps } from '../features/activities/activitySlice';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/activity_summary.scss';

const ActivitySummary = ({ onSelectActivity }) => {
  const dispatch = useDispatch();
  const { workoutHours, calories, steps } = useSelector(state => state.activities);
  
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({
    workoutHours: workoutHours,
    calories: calories,
    steps: steps
  });

  const handleIncrement = (type) => {
    switch (type) {
      case 'workout':
        dispatch(setWorkoutHours(workoutHours + 1));
        break;
      case 'calories':
        dispatch(setCalories(calories + 100));
        break;
      case 'steps':
        dispatch(setSteps(steps + 500));
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case 'workout':
        if (workoutHours > 0) {
          dispatch(setWorkoutHours(workoutHours - 1));
        }
        break;
      case 'calories':
        if (calories > 100) {
          dispatch(setCalories(calories - 100));
        }
        break;
      case 'steps':
        if (steps > 500) {
          dispatch(setSteps(steps - 500));
        }
        break;
      default:
        break;
    }
  };

  const handleEdit = (type) => {
    setEditing(type);
    setEditValues({
      workoutHours: workoutHours,
      calories: calories,
      steps: steps
    });
  };

  const handleSave = (type) => {
    switch (type) {
      case 'workout':
        if (editValues.workoutHours >= 0) {
          dispatch(setWorkoutHours(editValues.workoutHours));
        }
        break;
      case 'calories':
        if (editValues.calories > 0) {
          dispatch(setCalories(editValues.calories));
        }
        break;
      case 'steps':
        if (editValues.steps >= 0) {
          dispatch(setSteps(editValues.steps));
        }
        break;
      default:
        break;
    }
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleInputChange = (type, value) => {
    setEditValues(prev => ({
      ...prev,
      [type]: parseInt(value) || 0
    }));
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      handleSave(type);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Check if all activities are at minimum values
  const isAllEmpty = workoutHours === 0 && calories === 100 && steps === 0;

  if (isAllEmpty) {
    return (
      <div className="summary empty-state">
        <p>No activities tracked yet. Start tracking your fitness journey!</p>
        <img 
          src="/src/assets/loading_mascot.png" 
          alt="Loading mascot" 
          className="loading-mascot"
        />
      </div>
    );
  }

  return (
    <div className="summary">
      <div className="block workout" onClick={() => onSelectActivity('workout')}>
        <div className="block-content">
          <div className="block-label">Workout</div>
          <div className="block-value">
            {editing === 'workout' ? (
              <input
                type="number"
                value={editValues.workoutHours}
                onChange={(e) => handleInputChange('workoutHours', e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, 'workout')}
                onBlur={() => handleSave('workout')}
                autoFocus
                min="0"
                step="0.5"
              />
            ) : (
              <span onClick={(e) => { e.stopPropagation(); handleEdit('workout'); }}>
                {workoutHours} hrs
              </span>
            )}
          </div>
        </div>
        <div className="block-controls">
          <button 
            className="control-btn minus" 
            onClick={(e) => { e.stopPropagation(); handleDecrement('workout'); }}
          >
            <FaMinus />
          </button>
          <button 
            className="control-btn plus" 
            onClick={(e) => { e.stopPropagation(); handleIncrement('workout'); }}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="block calories" onClick={() => onSelectActivity('calories')}>
        <div className="block-content">
          <div className="block-label">Calories</div>
          <div className="block-value">
            {editing === 'calories' ? (
              <input
                type="number"
                value={editValues.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, 'calories')}
                onBlur={() => handleSave('calories')}
                autoFocus
                min="100"
                step="100"
              />
            ) : (
              <span onClick={(e) => { e.stopPropagation(); handleEdit('calories'); }}>
                {calories} kcal
              </span>
            )}
          </div>
        </div>
        <div className="block-controls">
          <button 
            className="control-btn minus" 
            onClick={(e) => { e.stopPropagation(); handleDecrement('calories'); }}
          >
            <FaMinus />
          </button>
          <button 
            className="control-btn plus" 
            onClick={(e) => { e.stopPropagation(); handleIncrement('calories'); }}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="block steps" onClick={() => onSelectActivity('steps')}>
        <div className="block-content">
          <div className="block-label">Steps</div>
          <div className="block-value">
            {editing === 'steps' ? (
              <input
                type="number"
                value={editValues.steps}
                onChange={(e) => handleInputChange('steps', e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, 'steps')}
                onBlur={() => handleSave('steps')}
                autoFocus
                min="0"
                step="100"
              />
            ) : (
              <span onClick={(e) => { e.stopPropagation(); handleEdit('steps'); }}>
                {steps}
              </span>
            )}
          </div>
        </div>
        <div className="block-controls">
          <button 
            className="control-btn minus" 
            onClick={(e) => { e.stopPropagation(); handleDecrement('steps'); }}
          >
            <FaMinus />
          </button>
          <button 
            className="control-btn plus" 
            onClick={(e) => { e.stopPropagation(); handleIncrement('steps'); }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;
