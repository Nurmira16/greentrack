import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/activity_summary.scss'


const ActivitySummary = () => {
  const { workoutHours, calories, steps } = useSelector(state => state.activities)

  return (
    <div className="summary">
      <div className="block workout">Workout: {workoutHours} hrs</div>
      <div className="block calories">Calories: {calories} kcal</div>
      <div className="block steps">Steps: {steps}</div>
    </div>
  )
}

export default ActivitySummary
