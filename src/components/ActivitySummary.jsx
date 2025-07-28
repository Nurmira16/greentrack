import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../styles/activity_summary.scss'
import ActivityCard from './ActivityCard'


const ActivitySummary = () => {
  const { workoutHours, calories, steps } = useSelector(state => state.activities)
  const [selected,setSelected]=useState(null)

  const handleClick=(type)=>{
    setSelected(type)
  }

  return (
    <div className="summary">
      <div className="block workout" onClick={()=>handleClick('workout')}>Workout: {workoutHours} hrs</div>
      <div className="block calories" onClick={()=>handleClick('calories')}>Calories: {calories} kcal</div>
      <div className="block steps" onClick={()=>handleClick('steps')}>Steps: {steps}</div>

      {selected && <ActivityCard type={selected}/>}

    </div>
  )
}

export default ActivitySummary
