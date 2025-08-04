import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addScheduleItem } from '../features/schedule/scheduleSlice';
import '../styles/schedule.scss';

const ScheduleList = () => {
  const schedule = useSelector(state => state.schedule);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    type: 'Workout',
    title: '',
    date: '',
    time: '',
    details: '',
  });

  const handleAdd = () => {
    if (!form.title || !form.date) return;
    dispatch(addScheduleItem(form));
    setForm({ type: 'Workout', title: '', date: '', time: '', details: '' });
  };

  return (
    <div className="schedule-list">
      <h2>My Schedule</h2>

      {schedule.map(item => (
        <div className="schedule-item" key={item.id}>
          <div className="item-info">
            <img
              src={`/${item.type.toLowerCase()}.png`} // You can swap with real icons
              alt={item.type}
            />
            <div className="text">
              <span className="title">{item.title}</span>
              <span className="time">
                {item.date} at {item.time}
              </span>
            </div>
          </div>
          <div className="tag">{item.details}</div>
        </div>
      ))}

      {/* Add form */}
      <div className="add-form">
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option>Workout</option>
          <option>Meal</option>
          <option>Steps</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Details"
          value={form.details}
          onChange={e => setForm({ ...form, details: e.target.value })}
        />
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
};

export default ScheduleList;
