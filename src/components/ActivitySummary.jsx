import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import supabase from '../supabaseClient';
import '../styles/activity_summary.scss';

// 🔹 Single Row Component
const ActivityRow = ({ label, current, target, color, onIncrement, onDecrement, unit }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="activity-row">
      <div className="info">
        <span className="label">{label}</span>
        <span className="target-info">
          {current} / {target} {unit}
        </span>
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
const ActivitySummary = ({ user }) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadActivities = async () => {
      const today = new Date().toISOString().slice(0, 10);

      const { data: activitiesData, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      console.log("Activities response:", { activitiesData, error });

      if (!activitiesData) {
        // No row → insert default
                  const { data: newRow, error: insertError } = await supabase
            .from("activities")
            .insert([{
              user_id: user.id,
              user_email: user.email,   // ✅ add this
              date: today,
              book_current: 0,
              book_target: 50,
              calories_current_kcal: 0,
              calories_target_kcal: 2000,
              leetcode_problem: null,
            }])
            .select()
            .single();


        if (insertError) {
          console.error("Insert error:", insertError);
        } else {
          setActivities(newRow);
        }
      } else {
        setActivities(activitiesData);
      }
    };

    loadActivities();
  }, [user]); // ✅ reruns when user loads

  const updateActivity = async (field, value) => {
    if (!activities || !activities.id) return;

    const updated = { ...activities, [field]: value };
    setActivities(updated);

    const { error } = await supabase
      .from("activities")
      .update({ [field]: value, updated_at: new Date() })
      .eq("id", activities.id);

    if (error) console.error("Update error:", error);
  };

  if (!activities) return <p>Loading...</p>;

  return (
    <div className="summary-rows">
      {/* Book Pages */}
      <ActivityRow
        label="Reading"
        current={activities.book_current}
        target={activities.book_target}
        unit="pages"
        color="#6C63FF"
        onIncrement={() => updateActivity("book_current", activities.book_current + 5)}
        onDecrement={() => updateActivity("book_current", Math.max(0, activities.book_current - 5))}
      />

      {/* Calories */}
      <ActivityRow
        label="Calories"
        current={activities.calories_current_kcal}
        target={activities.calories_target_kcal}
        unit="kcal"
        color="#E76F51"
        onIncrement={() => updateActivity("calories_current_kcal", activities.calories_current_kcal + 100)}
        onDecrement={() => updateActivity("calories_current_kcal", Math.max(0, activities.calories_current_kcal - 100))}
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
                updateActivity("leetcode_problem", null);
              } else {
                const problem = prompt("Enter LeetCode problem name:");
                if (problem && problem.trim() !== "") {
                  updateActivity("leetcode_problem", problem.trim());
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
