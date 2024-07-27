import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo-slicer/todo-slicer';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;