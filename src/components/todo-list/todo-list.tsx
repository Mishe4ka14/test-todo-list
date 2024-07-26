import TodoItem from '../todo-item/todo-item';
import styles from './todo-list.module.scss';

const TodoList = (): JSX.Element => {
  return(
    <main className={styles.page}>
      <h2 className={styles.title}>Moй список задач</h2>
      <TodoItem/>
      <TodoItem/>
      <TodoItem/>
    </main>
  )
}

export default TodoList;