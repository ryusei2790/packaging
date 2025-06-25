
// @ts-expect-error: JSON import for worksData
import worksData from '../../../../works.json';

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

type ListProps = {
  onSelect: (work: Work) => void;
  selectedId: string | null;
};

export default function List({ onSelect, selectedId }: ListProps) {
  return (
    <>
      {worksData.works.map((work: Work) => {
        const isSelected = work.id === selectedId;
        return (
          <div
            key={work.id}
            onClick={() => onSelect(work)}
            // className={styles.paper}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* <span><strong>ID:</strong> {work.id}</span> */}
              <span><strong>タイトル:</strong> {work.title}</span>
              <span><strong>場所:</strong> {work.departure.city} → {work.arrival.city}</span>
            </div>
            {isSelected && (
              <div style={{ marginTop: '0.5rem' }}>
                <div><strong>説明:</strong> {work.description}</div>
                <div><strong>出発地:</strong> {work.departure.city}（{work.departure.address}） [{work.departure.coordinates.latitude}, {work.departure.coordinates.longitude}]</div>
                <div><strong>到着地:</strong> {work.arrival.city}（{work.arrival.address}） [{work.arrival.coordinates.latitude}, {work.arrival.coordinates.longitude}]</div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
} 