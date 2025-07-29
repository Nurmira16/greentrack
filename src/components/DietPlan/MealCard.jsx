import React from 'react';
import '../../styles/diet_plan.scss'

const MealCard = ({ title, time, items }) => {
  return (
    <div className="meal-card">
      <h3>{title} <span>{time}</span></h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealCard;
