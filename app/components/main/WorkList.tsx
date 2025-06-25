import styles from './WorkList.module.css';
import worksData from '../../../works.json';

export default function WorkList() {
  // isDeparture, isArrivalフラグで出発地・到着地を取得
  const startWork = worksData.works.find(work => work.location.coordinates.isDeparture);
  const goalWork = worksData.works.find(work => work.location.coordinates.isArrival);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.paperStack}>
        <div className={styles.paper}></div>
        <div className={styles.paper}></div>
        <div className={styles.paper}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <div>
              <strong>出発地:</strong> {startWork ? `${startWork.location.city}（${startWork.location.coordinates.latitude}, ${startWork.location.coordinates.longitude}）` : '未設定'}
            </div>
            <div>
              <strong>到着地:</strong> {goalWork ? `${goalWork.location.city}（${goalWork.location.coordinates.latitude}, ${goalWork.location.coordinates.longitude}）` : '未設定'}
            </div>
          </div>
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