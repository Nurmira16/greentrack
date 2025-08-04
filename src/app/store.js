// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import activityReducer from '../features/activities/activitySlice'
import scheduleReducer from '../features/schedule/scheduleSlice'

export const store = configureStore({
  reducer: {
    activities: activityReducer,
    schedule: scheduleReducer,
  },
})
