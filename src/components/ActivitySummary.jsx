import React, { useEffect, useState } from 'react';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import supabase from '../supabaseClient';
import '../styles/activity_summary.scss';

const ActivityRow = ({ label, current, target, color, onIncrement, onDecrement, unit }) => {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;

  return (
    <div className="activity-row small">
      <div className="info">
        <span className="label">{label}</span>
        <span className="target-info">{current} / {target} {unit}</span>
      </div>

      <div className="progress-wrapper">
        <div className="progress-bar">
          <div className="fill" style={{ width: `${percentage}%`, background: color }} />
        </div>
      </div>

      <div className="controls">
        <button onClick={onDecrement} className="control-btn minus"><FaMinus /></button>
        <button onClick={onIncrement} className="control-btn plus"><FaPlus /></button>
      </div>
    </div>
  );
};

const ActivitySummary = ({ user }) => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadActivities = async () => {
      const today = new Date().toISOString().slice(0, 10);

      try {
        const { data: activitiesData, error } = await supabase
          .from("activities")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", today)
          .maybeSingle();

        if (!activitiesData) {
          // upsert with all NOT NULL fields
          const { data: newRow, error: upsertError } = await supabase
            .from("activities")
            .upsert(
              {
                user_id: user.id,
                user_email: user.email,
                date: today,
                book_current: 0,
                book_target: 20,
                calories_current_kcal: 0,
                calories_target_kcal: 1500,
                quran_pages: 0,
                quran_pages: 5,
                leetcode_problem: null
              },
              { onConflict: ["user_id", "date"] }
            )
            .select()
            .maybeSingle();

          if (upsertError) {
            console.error("Upsert error:", upsertError);
            setActivities({
              book_current: 0,
              book_target: 20,
              calories_current_kcal: 0,
              calories_target_kcal: 1500,
              quran_pages: 0,
              quran_target: 5,
              leetcode_problem: null
            });
          } else {
            setActivities(newRow);
          }
        } else {
          setActivities(activitiesData);
        }
      } catch (err) {
        console.error("Error loading activities:", err);
        setActivities({
          book_current: 0,
          book_target: 20,
          calories_current_kcal: 0,
          calories_target_kcal: 1500,
          quran_pages: 0,
          quran_target: 5,
          leetcode_problem: null
        });
      }
    };

    loadActivities();
  }, [user]);

  const updateActivity = async (field, value) => {
    if (!activities || !activities.id) return;
    setActivities({ ...activities, [field]: value });

    const { error } = await supabase
      .from("activities")
      .update({ [field]: value, updated_at: new Date() })
      .eq("id", activities.id);

    if (error) console.error("Update error:", error);
  };

  if (!activities) return <p>Loading...</p>;

  return (
    <div className="summary-rows">
      <ActivityRow
        label="Reading"
        current={activities.book_current}
        target={activities.book_target}
        unit="pages"
        color="#6C63FF"
        onIncrement={() => updateActivity("book_current", activities.book_current + 5)}
        onDecrement={() => updateActivity("book_current", Math.max(0, activities.book_current - 5))}
      />

      <ActivityRow
        label="Quran"
        current={activities.quran_pages}
        target={5}
        unit="pages"
        color="#2A9D8F"
        onIncrement={() => updateActivity("quran_pages", activities.quran_pages + 1)}
        onDecrement={() => updateActivity("quran_pages", Math.max(0, activities.quran_pages - 1))}
      />

      <ActivityRow
        label="Calories"
        current={activities.calories_current_kcal}
        target={activities.calories_target_kcal}
        unit="kcal"
        color="#E76F51"
        onIncrement={() => updateActivity("calories_current_kcal", activities.calories_current_kcal + 100)}
        onDecrement={() => updateActivity("calories_current_kcal", Math.max(0, activities.calories_current_kcal - 100))}
      />

      <div className="activity-row leetcode small">
        <div className="info">
          <span className="label">LeetCode</span>
          <span className="target-info">{activities.leetcode_problem || "Not Done"}</span>
        </div>
        <div className="progress-wrapper" style={{ flex: 2 }} />
        <div className="controls">
          <button
            onClick={async () => {
              if (activities.leetcode_problem) {
                updateActivity("leetcode_problem", null);
              } else {
                const problem = prompt("Enter LeetCode problem name:");
                if (problem?.trim()) updateActivity("leetcode_problem", problem.trim());
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
