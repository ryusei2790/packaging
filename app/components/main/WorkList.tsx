"use client";
import styles from './WorkList.module.css';

import NavMap from './NavMap';
import { useEffect, useState } from 'react';

type Work = {
  id: number;
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



export default function WorkList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [worksData, setWorksData] = useState<{ works: Work[] }>({ works: []});
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWork = async () => {
      const res = await fetch('/data/works.json');
      const data = await res.json();
      setWorksData(data);
    };

    fetchWork();
  }, []);

  const filteredWorks = worksData.works.filter((work) => work.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  const totalPages = Math.ceil(worksData.works.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = worksData.works.slice(startIndex, startIndex + itemsPerPage);


  const handleClick = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setSelectedId(null);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev -1);
      setSelectedId(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  if (worksData.works.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.findWorks}>
      {/* 検索ボックス */}
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="タイトル（場所にしたい）で検索" />
      {/*リスト表示*/}
      <ul>
        
          {currentItems.map((work) => {
            const isSelected = work.id === selectedId;
            return (
              <li key={work.id} onClick={() => handleClick(work.id)}
              className={styles.paper}
              
              >
                <div >
                  <span><strong>タイトル：</strong> {work.title}</span>
                  <span><strong>場所：</strong> {work.departure.city} → {work.arrival.city} </span>
                </div>
                {isSelected && (
                  <div >
                    <div><strong>出発地:</strong> {work.departure.city}（{work.departure.address}） [{work.departure.coordinates.latitude}, {work.departure.coordinates.longitude}]</div>
                    <div><strong>到着地:</strong> {work.arrival.city}（{work.arrival.address}） [{work.arrival.coordinates.latitude}, {work.arrival.coordinates.longitude}]</div>
                  </div>
                )}
                </li>
            );
          })}
      </ul>

      {/* 🔄 ページネーション */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          
        >
          ← 前へ
        </button>

        <span>ページ {currentPage} / {totalPages}</span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          
        >
          次へ →
        </button>
      </div>
    </div>
  );
} 