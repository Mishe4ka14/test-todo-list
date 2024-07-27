import { useDispatch } from 'react-redux';
import { ITodo } from '../../services/types/types';
import styles from './todo-item.module.scss';
import { deleteTodo, toggleTodoStatus } from '../../features/todo-slicer/todo-slicer';
import React from 'react';


const TodoItem = ({ todo, onItemClick }: { todo: ITodo; onItemClick: () => void }): JSX.Element => {
  const dispatch = useDispatch();
  const { title, description, id, date, completed } = todo;

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleTodoStatus(id));
  };

  return (
    <React.Fragment>
      <div className={styles.item} onClick={onItemClick}>
          <h3 className={styles.item_name}>{title}</h3>
          <p className={styles.item_description}>{description}</p>
        <div className={styles.box}>
          <p className={styles.data}>{date}</p>
          <div onClick={(e) => {
                e.stopPropagation();
                handleToggleStatus(id);
              }}>
            <button className={completed ? styles.ready : styles.not_ready}>
              {completed ? '✔' : ''}
            </button>
          </div>
          <button
            className={styles.delete_btn}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoItem;
