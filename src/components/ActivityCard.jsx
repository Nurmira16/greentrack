import { useSelector, useDispatch } from 'react-redux'
import { setWorkoutHours,setCalories,setSteps } from '../features/activities/activitySlice'
import '../styles/activity_card.scss'

const ActivityCard = ({type}) => {
  const dispatch = useDispatch()
  const activities=useSelector(state=>state.activities)

  const activityMap={
    workout:{
      label:'Workout',
      value: activities.workoutHours,
      increment: ()=>dispatch(setWorkoutHours(activities.workoutHours+1))
    },
    calories:{
      label:'Calories',
      value: activities.calories,
      increment: ()=>dispatch(setCalories(activities.calories+100))
    },
    steps:{
      label:'Steps',
      value: activities.step,
      increment: ()=>dispatch(setSteps(activities.steps+500))
    }
  }
  if (!activityMap[type]) return null;
  const {label,value,increment}=activityMap[type]

  return (
    <div className="activity-card">
    <h2 className="activity-card__title">{label}: {value}</h2>
    <button className="activity-card__button" onClick={increment}>
      Add {label}
    </button>
  </div>
  )
}

export default ActivityCard