import React from 'react';
import '../../styles/diet_plan.scss'

const RecommendedFoods = ({ foods }) => {
  return (
    <div className="recommended">
      <h3>Recommended Foods</h3>
      <ul>
        {foods.map((food, index) => (
          <li key={index}>
            <strong>{food.name}</strong> - {food.calories} kcal
            <p>{food.benefits}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedFoods;
