import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import supabase from '../supabaseClient';
import '../styles/activity_summary.scss';

// 🔹 Single Row Component
const ActivityRow = ({ label, current, target, color, onIncrement, onDecrement }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="activity-row">
      <div className="info">
        <span className="label">{label}</span>
        <span className="target-info">{current} / {target}</span>
      </div>

      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="fill"
            style={{ width: `${percentage}%`, background: color }}
          />
        </div>
      </div>

      <div className="controls">
        <button onClick={onDecrement} className="control-btn minus"><FaMinus /></button>
        <button onClick={onIncrement} className="control-btn plus"><FaPlus /></button>
      </div>
    </div>
  );
};

// 🔹 Main Summary Component
const ActivitySummary = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      console.log(today)

      try {
        // Fetch today's activities (or latest row)
        const { data: activitiesData, error } = await supabase
          .from('activities')
          .select('*')
          .limit(1)
          .single();

        if (error && error.code === 'PGRST116') {
          // No row → create default
          const { data: newRow, error: insertError } = await supabase
            .from('activities')
            .insert([{
              date: today,
              book_current: 0,
              book_target: 50,
              calories_current_kcal: 0,
              calories_target_kcal: 2000,
              leetcode_problem: null
            }])
            .select()
            .single();

          if (insertError) console.error(insertError);
          else setActivities(newRow);

        } else if (activitiesData) {
          const rowDate = activitiesData.date ? activitiesData.date.slice(0,10) : today;

          // Daily reset if the date is not today
          if (rowDate !== today) {
            // Save yesterday's progress to history
            await supabase.from('activities_history').insert([{
              date: rowDate,
              book_done: activitiesData.book_current || 0,
              calories_done_kcal: activitiesData.calories_current_kcal || 0,
              leetcode_problem: activitiesData.leetcode_problem || null
            }]);

            // Reset today's activities
            await supabase
              .from('activities')
              .update({
                date: today,
                book_current: 0,
                calories_current_kcal: 0,
                leetcode_problem: null
              })
              .eq('id', activitiesData.id);

            // Reload updated row
            const { data: updatedRow } = await supabase
              .from('activities')
              .select('*')
              .limit(1)
              .single();

            setActivities(updatedRow);
          } else {
            setActivities(activitiesData);
          }
        }
      } catch (err) {
        console.error("Error loading activities:", err);
      }
    };

    loadActivities();
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
    <div className="summary-rows">
      {/* Book Pages */}
      <ActivityRow
        label="Reading"
        current={activities.book_current}
        target={`${activities.book_target} pages`}
        color="#6C63FF"
        onIncrement={() => updateActivity('book_current', activities.book_current + 5)}
        onDecrement={() => updateActivity('book_current', Math.max(0, activities.book_current - 5))}
      />

      {/* Calories */}
      <ActivityRow
        label="Calories"
        current={activities.calories_current_kcal}
        target={`${activities.calories_target_kcal} kcal`}
        color="#E76F51"
        onIncrement={() => updateActivity('calories_current_kcal', activities.calories_current_kcal + 100)}
        onDecrement={() => updateActivity('calories_current_kcal', Math.max(0, activities.calories_current_kcal - 100))}
      />

      {/* LeetCode Problem */}
      <div className="activity-row leetcode">
        <div className="info">
          <span className="label">LeetCode</span>
          <span className="target-info">
            {activities.leetcode_problem || "Not Done"}
          </span>
        </div>

        <div className="progress-wrapper" style={{ flex: 2 }} />

        <div className="controls">
          <button
            onClick={async () => {
              if (activities.leetcode_problem) {
                updateActivity('leetcode_problem', null);
              } else {
                const problem = prompt("Enter LeetCode problem name:");
                if (problem && problem.trim() !== "") {
                  updateActivity('leetcode_problem', problem.trim());
                }
              }
            }}
            className="control-btn leetcode-btn"
          >
            {activities.leetcode_problem ? <FaCheck /> : <FaPlus />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;
