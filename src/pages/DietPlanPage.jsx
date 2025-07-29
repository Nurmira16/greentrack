import React from 'react';
import MealCard from '../components/DietPlan/MealCard';
import Macronutrients from '../components/DietPlan/Macronutrients';
import RecommendedFoods from '../components/DietPlan/RecommendedFoods';
import '../styles/diet_plan.scss'


const DietPlanPage = () => {
  const meals = [
    {
      title: 'Breakfast',
      time: '08:00 AM',
      items: ['Oatmeal with berries', 'Boiled eggs', 'Green tea'],
    },
    {
      title: 'Lunch',
      time: '01:00 PM',
      items: ['Grilled chicken breast', 'Brown rice', 'Steamed vegetables'],
    },
    {
      title: 'Dinner',
      time: '07:00 PM',
      items: ['Salmon fillet', 'Quinoa', 'Avocado salad'],
    },
  ];

  const macronutrients = {
    protein: { current: 90, goal: 120 },
    carbs: { current: 160, goal: 200 },
    fats: { current: 45, goal: 70 },
  };

  const recommendedFoods = [
    {
      name: 'Avocado',
      calories: 160,
      benefits: 'Good source of healthy fats and fiber',
    },
    {
      name: 'Greek Yogurt',
      calories: 100,
      benefits: 'High in protein and probiotics',
    },
    {
      name: 'Sweet Potato',
      calories: 110,
      benefits: 'Rich in complex carbs and beta-carotene',
    },
  ];

  return (
    <div className="diet-plan-page">
      <div className="meals">
        {meals.map((meal, index) => (
          <MealCard key={index} {...meal} />
        ))}
      </div>

      <div className="sidebar">
        <Macronutrients
          protein={macronutrients.protein}
          carbs={macronutrients.carbs}
          fats={macronutrients.fats}
        />
        <RecommendedFoods foods={recommendedFoods} />
      </div>
    </div>
  );
};

export default DietPlanPage;
