import { Middleware } from '@reduxjs/toolkit';

// милдвара для сохранения состояний в локал сторадж
const localStorageMiddleware: Middleware<{}, any> = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('todoState', JSON.stringify(state.todo));

  return result;
};

export default localStorageMiddleware;
