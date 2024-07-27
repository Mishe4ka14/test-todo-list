// import { useState } from 'react';
import { ITodo } from '../../services/types/types';
import styles from './todo-item.module.scss';

const TodoItem = ({todo, onItemClick} :  {todo: ITodo; onItemClick: () => void }):JSX.Element => {

  const {title, description} = todo;

  return(
    <div className={styles.item} onClick={onItemClick}>
      <h3 className={styles.item_name}>{title}</h3>
      <p className={styles.item_description}>{description}</p>
      <div className={styles.box}>
        <p className={styles.data}>12:59</p>
        <div className={styles.item_status}></div>
        <button>Удалить</button>
      </div>
    </div>
  )
};

export default TodoItem;

