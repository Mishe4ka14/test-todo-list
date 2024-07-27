import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo-slicer/todo-slicer';
import localStorageMiddleware from '../middlewares/local-storage-middleware';
import formatTime from '../hooks/formate-time';

// загружаем состояние из локал стораджа в хранилище
const preloadedState = () => {
  const savedState = localStorage.getItem('todoState');
  //
  if (!savedState) {
    // если неопределен локалстораж - пустой массив
    const initialState = { todoItems: [] };
    localStorage.setItem('todoState', JSON.stringify(initialState));
    return { todo: initialState };
  }
  const parsedState = JSON.parse(savedState);
  return { todo: parsedState };
};

// при каждом изменении стора загружаем предыдущее состояние из локалстораджа
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: preloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
