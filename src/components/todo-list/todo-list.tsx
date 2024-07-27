import React, { useState, useCallback, useMemo } from 'react';
import TodoItem from '../todo-item/todo-item';
import styles from './todo-list.module.scss';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { ITodo } from '../../services/types/types';
import { addTodo, changeTodo } from '../../features/todo-slicer/todo-slicer';

const TodoList = (): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const todoItems = useSelector((state: RootState) => state.todo.todoItems);

  // для редактирования - передаем в модалку текущий туду
  const handleItemClick = useCallback((item: ITodo) => {
    setCurrentTodo(item);
    setIsModalOpen(true);
  }, []);

  // для добавления - передаем в модалку пустые поля
  const handleAddTask = useCallback(() => {
    setCurrentTodo(null);
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback((title: string, description: string) => {
    if (currentTodo) {
      dispatch(changeTodo({ id: currentTodo.id, title, description }));
    } else {
      dispatch(addTodo({ title, description }));
    }
    setIsModalOpen(false);
  }, [currentTodo, dispatch]);

  const handleFilterChange = useCallback((filter: string) => {
    setFilter(filter);
  }, []);

  const filteredItems = useMemo(() => {
    return todoItems.filter(item => {
      if (filter === 'completed') {
        return item.completed;
      } else if (filter === 'incomplete') {
        return !item.completed;
      } else {
        return true;
      }
    });
  }, [todoItems, filter]);

  const moveTodo = useCallback((fromIndex: number, toIndex: number) => {
    const updatedTodos = [...todoItems];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);

    // диспатчим обновление порядка
    dispatch({ type: 'todo/moveTodo', payload: updatedTodos });
  }, [dispatch, todoItems]);

  return (
    <main className={styles.page}>
      <div className={styles.box}>
        <h2 className={styles.title}>Moй список задач</h2>
        <button className={styles.add_btn} onClick={handleAddTask}>Добавить</button>
      </div>
      <div>
        <div className={styles.filter}>
          <button className={filter === 'all' ? styles.filter_btn_active : styles.filter_btn} onClick={() => handleFilterChange('all')}>Все</button>
          <button className={filter === 'completed' ? styles.filter_btn_active : styles.filter_btn} onClick={() => handleFilterChange('completed')}>Сделано</button>
          <button className={filter === 'incomplete' ? styles.filter_btn_active : styles.filter_btn} onClick={() => handleFilterChange('incomplete')}>Не сделано</button>
        </div>
      </div>
      {filteredItems.length ? filteredItems.map((item, index) => (
        <TodoItem
          key={item.id}
          todo={item}
          moveTodo={moveTodo}
          index={index}
          onItemClick={() => handleItemClick(item)}
        />
      )) : null}
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          todo={currentTodo}
        />
      ) : null}
    </main>
  );
}

export default React.memo(TodoList);
