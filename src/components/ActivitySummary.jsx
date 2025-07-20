import React from 'react'
import { useSelector } from 'react-redux'

const ActivitySummary = () => {
  const { workoutHours, calories, steps } = useSelector(state => state.activities)

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded">Workout: {workoutHours} hrs</div>
      <div className="bg-orange-100 p-4 rounded">Calories: {calories} kcal</div>
      <div className="bg-purple-100 p-4 rounded">Steps: {steps}</div>
    </div>
  )
}

export default ActivitySummary
