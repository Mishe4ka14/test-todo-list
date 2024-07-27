import { useDispatch } from 'react-redux';
import { ItemTypes, ITodo } from '../../services/types/types';
import styles from './todo-item.module.scss';
import { deleteTodo, toggleTodoStatus } from '../../features/todo-slicer/todo-slicer';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TodoItemProps {
  todo: ITodo;
  index: number;
  moveTodo: (fromIndex: number, toIndex: number) => void;
  onItemClick: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, moveTodo, onItemClick }) => {
  const dispatch = useDispatch();
  const { title, description, id, date, completed } = todo;

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleTodoStatus(id));
  };

  // добавляем индексы для перетаскивания
  const [, ref] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });
  return (
    <React.Fragment>
      <div 
        className={styles.item}
        onClick={onItemClick}
        ref={(node) => ref(drop(node))}
        >
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
