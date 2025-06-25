"use client"
import styles from './page.module.css';
import WorkList from './components/main/WorkList';
import NavMap from './components/main/NavMap';
import { useState } from 'react';

// Work型を定義
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

export default function HomePage() {
  const [selected, setSelected] = useState<Work | null>(null);

  return (
    <div className={styles.pageContainer}>
      <WorkList
        onSelect={setSelected}
        selectedId={selected ? selected.id : null}
      />
      <NavMap
        {...(selected && {
          flat: selected.departure.coordinates.latitude,
          flng: selected.departure.coordinates.longitude,
          llat: selected.arrival.coordinates.latitude,
          llng: selected.arrival.coordinates.longitude,
        })}
      />
    </div>
  );
}
