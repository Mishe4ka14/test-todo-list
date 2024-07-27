import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list/todo-list';

function App() {
  return (
    <React.Fragment>
      <AppHeader/>
      <TodoList/>
    </React.Fragment>
  );
}

export default App;
