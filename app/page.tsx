import styles from './page.module.css';
import WorkList from './components/main/WorkList';


export default function HomePage() {

  return (
    <div className={styles.container}>
      <WorkList />
    </div>
  );
}
