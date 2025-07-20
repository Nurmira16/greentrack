import { useSelector, useDispatch } from 'react-redux'
import { setWorkoutHours } from '../features/activities/activitySlice'

const ActivityCard = () => {
  const { workoutHours } = useSelector(state => state.activities)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Workout: {workoutHours} hrs</h2>
      <button onClick={() => dispatch(setWorkoutHours(workoutHours + 1))}>Add Hour</button>
    </div>
  )
}

export default ActivityCard