import { useState } from 'react';
import TodoItem from '../todo-item/todo-item';
import styles from './todo-list.module.scss';
import Modal from '../modal/modal';

const TodoList = (): JSX.Element => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleItemClick = () => {
    setIsModalOpen(true);
  };

  return(
    <main className={styles.page}>
      <h2 className={styles.title}>Moй список задач</h2>
      <TodoItem onItemClick={handleItemClick}/>
      <TodoItem onItemClick={handleItemClick}/>
      <TodoItem onItemClick={handleItemClick}/>
      {isModalOpen ? (
        <Modal onClose={() => setIsModalOpen(false)}>
        </Modal>) : null}
    </main>
  )
}

export default TodoList;