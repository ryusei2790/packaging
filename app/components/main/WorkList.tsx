import styles from './WorkList.module.css';
import List from './List/List';

type Work = {
  id: string;
  title: string;
  description: string;
  departure: {
    city: string;
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  arrival: {
    city: string;
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
};

type WorkListProps = {
  onSelect: (work: Work) => void;
  selectedId: string | null;
};

export default function WorkList({ onSelect, selectedId }: WorkListProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.paper}></div>
      <div className={styles.paper}></div>
      <div className={styles.paper}>
        <List onSelect={onSelect} selectedId={selectedId} />
      </div>
    </div>
  );
}