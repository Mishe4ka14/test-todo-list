import styles from './app-header.module.scss';

const AppHeader = ():JSX.Element => {
  return(
    <header className={styles.header}>
      <h1 className={styles.title}>Simple Tasks</h1>
    </header>
  )
}

export default AppHeader;