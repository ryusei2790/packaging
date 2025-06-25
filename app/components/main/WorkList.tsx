import styles from './WorkList.module.css';
import worksData from '../../../works.json';

export default function WorkList() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.paperStack}>
        <div className={styles.paper}></div>
        <div className={styles.paper}></div>
        <div className={styles.paper}>
        <h1>作品一覧 ({worksData.metadata.totalWorks}件)</h1>
        {worksData.works.map((work) => (
          <div key={work.id}>
            <h2>{work.title}</h2>
            <p>{work.description}</p>
            <p>場所: {work.location.city}, {work.location.country}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}