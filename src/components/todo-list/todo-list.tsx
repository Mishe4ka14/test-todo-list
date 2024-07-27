import { useState } from 'react';
import TodoItem from '../todo-item/todo-item';
import styles from './todo-list.module.scss';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const TodoList = (): JSX.Element => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const todoItems = useSelector((state: RootState) => state.todo.todoItems)

  const handleItemClick = () => {
    setIsModalOpen(true);
  };

  return(
    <main className={styles.page}>
      <h2 className={styles.title}>Moй список задач</h2>
      {todoItems.map(item => (
        <TodoItem 
          key={item.id}
          todo={item}
          onItemClick={handleItemClick}
          />
      ))}
      {/* <TodoItem onItemClick={handleItemClick}/>
      <TodoItem onItemClick={handleItemClick}/>
      <TodoItem onItemClick={handleItemClick}/> */}
      {isModalOpen ? (
        <Modal onClose={() => setIsModalOpen(false)}>
        </Modal>) : null}
    </main>
  )
}

export default TodoList;