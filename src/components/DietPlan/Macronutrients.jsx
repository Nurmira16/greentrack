import React from 'react';
import '../../styles/diet_plan.scss'

const Macronutrients = ({ protein, carbs, fats }) => {
  return (
    <div className="macros">
      <h3>Macronutrients</h3>
      <div className="bar">
        <label>Protein</label>
        <progress value={protein.current} max={protein.goal}></progress>
        <span>{protein.current}/{protein.goal}g</span>
      </div>
      <div className="bar">
        <label>Carbs</label>
        <progress value={carbs.current} max={carbs.goal}></progress>
        <span>{carbs.current}/{carbs.goal}g</span>
      </div>
      <div className="bar">
        <label>Fats</label>
        <progress value={fats.current} max={fats.goal}></progress>
        <span>{fats.current}/{fats.goal}g</span>
      </div>
    </div>
  );
};

export default Macronutrients;
