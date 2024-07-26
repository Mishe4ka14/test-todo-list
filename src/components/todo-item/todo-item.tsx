// import { useState } from 'react';
import styles from './todo-item.module.scss';

const TodoItem = ({onItemClick} :  { onItemClick: () => void }):JSX.Element => {
  
  return(
    <div className={styles.item} onClick={onItemClick}>
      <h3 className={styles.item_name}>Первая задача</h3>
      <p className={styles.item_description}>Сходить погулять, набрать грибов и все такое</p>
      <div className={styles.box}>
        <p className={styles.data}>12:59</p>
        <div className={styles.item_status}></div>
        <button>Удалить</button>
      </div>
    </div>
  )
};

export default TodoItem;

