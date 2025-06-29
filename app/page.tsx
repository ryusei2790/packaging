import styles from './page.module.css';
import WorkList from './components/main/WorkList';
import Link from 'next/link';


export default function HomePage() {

  return (
    <div className={styles.container}>
      <WorkList />
    </div>
  );
}
