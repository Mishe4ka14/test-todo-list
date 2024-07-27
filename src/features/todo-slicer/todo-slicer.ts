import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../services/types/types';

interface todoState {
  todoItems: ITodo[];
}

const initialState: todoState = {
  todoItems: [
    { id: 0,
      title: 'Первая задачка',
      description: 'Сходить в лес, набрать грибов и все такое',
      completed: false},
    { id: 1,
      title: 'Вторая задачка',
      description: 'Написать проект, съесть грибы и все такое',
      completed: false},
  ]
}

const todoSlicer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string, description: string}>) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.todoItems.push(newTodo);
    },
    changeTodo: (state, action: PayloadAction<{id: number, title: string, description: string}>) => {
      const index = state.todoItems.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todoItems[index] = {
          ...state.todoItems[index],
          title: action.payload.title,
          description: action.payload.description,
        };
    }
  },
  toggleTodoStatus: (state, action: PayloadAction<number>) => {
    const index = state.todoItems.findIndex(todo => todo.id === action.payload);
    if (index !== -1) {
      state.todoItems[index].completed = !state.todoItems[index].completed;
    }
  },
  deleteTodo: (state, action: PayloadAction<number>) => {
    state.todoItems = state.todoItems.filter(todo => todo.id !== action.payload);
  },
},
})

export const { addTodo, changeTodo, toggleTodoStatus, deleteTodo } = todoSlicer.actions;
export default todoSlicer.reducer;