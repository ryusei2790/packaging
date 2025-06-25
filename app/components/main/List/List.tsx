// @ts-expect-error: JSON import for worksData
import worksData from '../../../works.json' assert { type: 'json' };

type Work = {
  id: string;
  title: string;
  description: string;
  requestDate: string;
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
  gallery: string[];
};

export default function List() {
  return (
    <div>
      <h1>配達依頼一覧</h1>
      {(worksData.works as Work[]).map((work: Work) => (
        <div key={work.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
          <h2>{work.title}</h2>
          <p><strong>ID:</strong> {work.id}</p>
          <p><strong>説明:</strong> {work.description}</p>
          <p><strong>依頼日:</strong> {new Date(work.requestDate).toLocaleString('ja-JP')}</p>
          <div>
            <strong>出発地:</strong>
            <div>都市: {work.departure.city}</div>
            <div>住所: {work.departure.address}</div>
            <div>座標: ({work.departure.coordinates.latitude}, {work.departure.coordinates.longitude})</div>
          </div>
          <div>
            <strong>到着地:</strong>
            <div>都市: {work.arrival.city}</div>
            <div>住所: {work.arrival.address}</div>
            <div>座標: ({work.arrival.coordinates.latitude}, {work.arrival.coordinates.longitude})</div>
          </div>
          <div>
            <strong>ギャラリー:</strong>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {work.gallery.map((img: string, idx: number) => (
                <img key={idx} src={img} alt={work.title + ' image ' + (idx + 1)} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
