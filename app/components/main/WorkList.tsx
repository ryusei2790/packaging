"use client";
import styles from './WorkList.module.css';
import BodyEventCalendar from './BodyEventCalendar';


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

  const selectedWork = worksData.works.find(work => work.id === selectedId) || null;
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWork = async () => {
      const res = await fetch('/data/works.json');
      const data = await res.json();
      console.log('data:', data);
      console.log('data type:', typeof data);
      console.log('data is array:', Array.isArray(data));
      setWorksData(data);
    };

    fetchWork();
  }, []);

  const filteredWorks = worksData.works.filter((work) => 
    work.departure.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
  work.arrival.city.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div>
      <div>
        {/* 検索ボックス */}
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="出発地か到着地で検索" />
        {/*リスト表示*/}
        <ul>
          
            {currentItems.map((work) => {
              const isSelected = work.id === selectedId;
              return (
                <li key={work.id} onClick={() => handleClick(work.id)}
                
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
        <div>
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
        <div className={styles.NavMap}>
          <NavMap work={selectedWork} />
        </div>
        <div className={styles.Calendar}>
         <BodyEventCalendar />
        </div>
    </div>
  );
} 
