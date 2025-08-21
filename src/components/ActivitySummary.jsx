import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import supabase from '../supabaseClient';
import '../styles/activity_summary.scss';

const ActivityCircle = ({ label, current, target, color, onIncrement, onDecrement }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="circle-container">
      <CircularProgressbar
        value={percentage}
        text={`${current}`}
        styles={buildStyles({
          textColor: '#264653',
          pathColor: color,
          trailColor: '#F0F0F3',
          textSize: '16px',
          strokeLinecap: 'round'
        })}
      />
      <div className="circle-label">{label}</div>
      <div className="circle-buttons">
        <button onClick={onDecrement} className="control-btn minus"><FaMinus /></button>
        <button onClick={onIncrement} className="control-btn plus"><FaPlus /></button>
      </div>
      <small className="target">Target: {target}</small>
    </div>
  );
};

const ActivitySummary = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      // 1. Try to fetch the first activities row
      const { data: activitiesData, error } = await supabase
        .from('activities')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code === 'PGRST116') {
        // No row found, insert default
        const { data: newRow, error: insertError } = await supabase
          .from('activities')
          .insert([{
            workout_current: 0,
            workout_target: 5,
            calories_current: 0,
            calories_target: 2000,
            steps_current: 0,
            steps_target: 10000
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error inserting default activities row:', insertError);
        } else {
          setActivities(newRow);
        }
      } else if (activitiesData) {
        setActivities(activitiesData);
      } else if (error) {
        console.error('Error fetching activities:', error);
      }
    };

    getActivities();
  }, []);

  const updateActivity = async (field, value) => {
    if (!activities || !activities.id) return;

    const updated = { ...activities, [field]: value };
    setActivities(updated);

    const { error } = await supabase
      .from('activities')
      .update({ [field]: value, updated_at: new Date() })
      .eq('id', activities.id);

    if (error) console.error('Update error:', error);
  };

  if (!activities) return <p>Loading...</p>;

  return (
    <div className="summary-circles">
      <ActivityCircle
        label="Workout"
        current={activities.workout_current}
        target={activities.workout_target}
        color="#F4A261"
        onIncrement={() => updateActivity('workout_current', activities.workout_current + 1)}
        onDecrement={() => updateActivity('workout_current', Math.max(0, activities.workout_current - 1))}
      />
      <ActivityCircle
        label="Calories"
        current={activities.calories_current}
        target={activities.calories_target}
        color="#E76F51"
        onIncrement={() => updateActivity('calories_current', activities.calories_current + 100)}
        onDecrement={() => updateActivity('calories_current', Math.max(0, activities.calories_current - 100))}
      />
      <ActivityCircle
        label="Steps"
        current={activities.steps_current}
        target={activities.steps_target}
        color="#2A9D8F"
        onIncrement={() => updateActivity('steps_current', activities.steps_current + 500)}
        onDecrement={() => updateActivity('steps_current', Math.max(0, activities.steps_current - 500))}
      />
    </div>
  );
};

export default ActivitySummary;
