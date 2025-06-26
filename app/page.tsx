import styles from './page.module.css';
import WorkList from './components/main/WorkList';



export default function HomePage() {

  return (
    <div className={styles.pageContainer}>
      <div className={styles.paperStack}>
        <div className={styles.paper}></div>
        <div className={styles.paper}></div>
        <div className={styles.paper}>
          <WorkList />
        </div>
      </div>
    </div>
  );
}
