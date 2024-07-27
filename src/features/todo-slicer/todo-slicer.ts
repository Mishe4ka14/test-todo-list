import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../services/types/types';
import formatTime from '../../hooks/formate-time';
import { v4 as uuidv4 } from 'uuid'; 

interface todoState {
  todoItems: ITodo[];
}

const initialState: todoState = {
  todoItems: [
    // { id: 0,
    //   title: 'Первая задачка',
    //   description: 'Сходить в лес, набрать грибов и все такое',
    //   completed: false,
    //   date: formatTime(new Date()),
    // },
    // { id: 1,
    //   title: 'Вторая задачка',
    //   description: 'Написать проект, съесть грибы и все такое',
    //   completed: true,
    //   date: formatTime(new Date())},
  ]
}

const todoSlicer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string, description: string}>) => {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        date: formatTime(new Date()),
      };
      state.todoItems.push(newTodo);
    },
    changeTodo: (state, action: PayloadAction<{id: string, title: string, description: string}>) => {
      const index = state.todoItems.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todoItems[index] = {
          ...state.todoItems[index],
          title: action.payload.title,
          description: action.payload.description,
        };
    }
  },
  toggleTodoStatus: (state, action: PayloadAction<string>) => {
    const todo = state.todoItems.find(todo => todo.id === action.payload);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  deleteTodo: (state, action: PayloadAction<string>) => {
    state.todoItems = state.todoItems.filter(todo => todo.id !== action.payload);
  },
  clearTodoItems: (state) => {
    state.todoItems = [];
  },
},
})

export const { addTodo, changeTodo, toggleTodoStatus, deleteTodo, clearTodoItems } = todoSlicer.actions;
export default todoSlicer.reducer;