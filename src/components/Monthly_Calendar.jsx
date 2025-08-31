// src/pages/MonthlyCalendar.jsx
import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "../styles/monthly_calendar.scss";

const activitiesColors = {
  book: "#6C63FF",
  calories: "#E76F51",
  leetcode: "#FFB703",
  quran: "#2A9D8F"
};

const MonthlyCalendar = ({ user }) => {
  const [activities, setActivities] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      const start = `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`;
      const end = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${new Date(currentYear, currentMonth, 0).getDate()}`;

      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", start)
        .lte("date", end);

      if (error) console.error(error);
      else setActivities(data || []);
    };

    fetchActivities();
  }, [user, currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const activity = activities.find(a => new Date(a.date).getDate() === day);
    return { day, activity };
  });

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Totals per month
  const totals = activities.reduce(
    (acc, a) => ({
      book: acc.book + (a.book_current || 0),
      calories: acc.calories + (a.calories_current_kcal || 0),
      leetcode: acc.leetcode + (a.leetcode_problem ? 1 : 0),
      quran: acc.quran + (a.quran_pages || 0),
    }),
    { book: 0, calories: 0, leetcode: 0, quran: 0 }
  );

  return (
    <div className="monthly-calendar-wrapper">
      <div className="monthly-calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt; Prev</button>
          <h2>
            {new Date(currentYear, currentMonth - 1).toLocaleString("default", {
              month: "long"
            })} {currentYear}
          </h2>
          <button onClick={handleNextMonth}>Next &gt;</button>
        </div>

        <div className="calendar-grid">
          {daysArray.map(({ day, activity }) => (
            <div key={day} className="calendar-day">
              <div className="quadrant">
                <div
                  className="tl"
                  style={{ background: activity?.book_current ? activitiesColors.book : "#fff" }}
                />
                <div
                  className="tr"
                  style={{ background: activity?.calories_current_kcal ? activitiesColors.calories : "#fff" }}
                />
                <div
                  className="bl"
                  style={{ background: activity?.leetcode_problem ? activitiesColors.leetcode : "#fff" }}
                />
                <div
                  className="br"
                  style={{ background: activity?.quran_pages ? activitiesColors.quran : "#fff" }}
                />
                <div className="day-number">{day}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Totals section */}
        <div className="monthly-totals">
          <div className="total-item">
            <span className="color-box" style={{ background: activitiesColors.book }} /> Book: {totals.book} pages
          </div>
          <div className="total-item">
            <span className="color-box" style={{ background: activitiesColors.quran }} /> Quran: {totals.quran} pages
          </div>
          <div className="total-item">
            <span className="color-box" style={{ background: activitiesColors.calories }} /> Calories: {totals.calories} kcal
          </div>
          <div className="total-item">
            <span className="color-box" style={{ background: activitiesColors.leetcode }} /> LeetCode: {totals.leetcode} solved
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
