// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import activityReducer from '../features/activities/activitySlice'


export const store = configureStore({
  reducer: {
    activities: activityReducer,
   
  },
})
