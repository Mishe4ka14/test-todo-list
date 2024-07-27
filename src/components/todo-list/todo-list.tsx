import { useState } from 'react';
import TodoItem from '../todo-item/todo-item';
import styles from './todo-list.module.scss';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ITodo } from '../../services/types/types';
import { useDispatch } from 'react-redux';
import { addTodo, changeTodo } from '../../features/todo-slicer/todo-slicer';

const TodoList = (): JSX.Element => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);

  const todoItems = useSelector((state: RootState) => state.todo.todoItems)

  // для редактирования - передаем в модалку текущий туду
  const handleItemClick = (item: ITodo) => {
    setCurrentTodo(item)
    setIsModalOpen(true);
  };

  // для добавления - передаем в модалку пустые поля
  const handleAddTask = () => {
    setCurrentTodo(null)
    setIsModalOpen(true);
  }

  const handleSave = (title: string, description: string) => {
    if (currentTodo) {
      dispatch(changeTodo(({id: currentTodo.id, title, description})))
    } else {
      dispatch(addTodo({title, description}))
    }
    setIsModalOpen(false)
  }

  return(
    <main className={styles.page}>
      <div className={styles.box}>
        <h2 className={styles.title}>Moй список задач</h2>
        <button className={styles.add_btn} onClick={handleAddTask}>Добавить</button>
      </div>
      {todoItems.map(item => (
        <TodoItem 
          key={item.id}
          todo={item}
          onItemClick={() => handleItemClick(item)}
          />
      ))}
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          todo={currentTodo}
          />
        ) : null}
    </main>
  )
}

export default TodoList;