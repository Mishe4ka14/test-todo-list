import { useDispatch } from 'react-redux';
import styles from './app-header.module.scss';
import { clearTodoItems } from '../../features/todo-slicer/todo-slicer';

const AppHeader = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    localStorage.removeItem('todoState');
    dispatch(clearTodoItems());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Simple Tasks</h1>
      <div className={styles.tooltip}>
        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          Выход
        </button>
        <span className={styles.tooltiptext}>Сброс текущей сессии</span>
      </div>
    </header>
  );
};

export default AppHeader;
