import { createSlice, nanoid } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: [],
  reducers: {
    addScheduleItem: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ type, title, date, time, details }) {
        return {
          payload: {
            id: nanoid(),
            type,
            title,
            date,
            time,
            details,
            completed: false,
          },
        };
      },
    },
    removeScheduleItem(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
    updateScheduleItem(state, action) {
      const { id, updates } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        Object.assign(item, updates);
      }
    },
    toggleComplete(state, action) {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});

export const {
  addScheduleItem,
  removeScheduleItem,
  updateScheduleItem,
  toggleComplete,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
