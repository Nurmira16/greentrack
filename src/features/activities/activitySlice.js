import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  workoutHours: 4,
  calories: 1800,
  steps: 2200,
}

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setWorkoutHours: (state, action) => {
      state.workoutHours = action.payload
    },
    setCalories: (state, action) => {
      state.calories = action.payload
    },
    setSteps: (state, action) => {
      state.steps = action.payload
    },
  },
})

export const { setWorkoutHours, setCalories, setSteps } = activitySlice.actions
export default activitySlice.reducer
