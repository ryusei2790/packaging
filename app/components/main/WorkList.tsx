"use client";
import React, { useState, useEffect } from 'react';
import {useRouter, useSearchParams } from 'next/navigation';
import styles from './WorkList.module.css';
import NavMap from './NavMap';
import BodyEventCalendar from './BodyEventCalendar';

type Work = {
  id: number;
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
  requester: string;
  cargoDetails: string;
  price: number;
};

export default function WorkList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [worksData, setWorksData] = useState<{ works: Work[] }>({ works: [] });
  const selectedWork = worksData.works.find(work => work.id === selectedId) || null;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();//newData=>Data, response=>res

  // const [style, setStyle] = useState('style');

  // useEffect(() => {
  //   const fetchWork = async () => {
  //     const res = await fetch('/data/works.json');
  //     const data = await res.json();
  //     console.log('data:', data);
  //     console.log('data type:', typeof data);
  //     console.log('data is array:', Array.isArray(data));
  //     setWorksData(data);
  //   };

  //   fetchWork();
  // }, []);

  async function fetchData(page) {
    try{
      const res = await fetch(`/data/works.json`);
      if (!res.ok) {
        throw new Error("Bad response");
      }
      const Data = await res.json();
      setTotalPages(Data.totalPages);
      setCurrentPage(Data.currentPage);
      setWorksData(Data.items);
    } catch (error) {
      console.error("Failed:", error);
    }
  }

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    fetchData(page);
  },[searchParams]);

  const generationPagination = () => {
    const pages = [];
    for (let i = 1; i <=)
  }

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
      setCurrentPage(prev => prev - 1);
      setSelectedId(null);
    }
  };


//検索機能
  const filteredWorks = worksData.works.filter((work) => 
    work.departure.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.arrival.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredWorks.slice(startIndex, startIndex + itemsPerPage);

  // const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (worksData.works.length === 0) {
    return <p>Loading...</p>;
  }

  // let workList = 

  return (
    <div className={styles.container}>
      <div className={styles.listSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="出発地または到着地で検索..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.workList}>
          {currentItems.map((work) => (
            <div key={work.id}>
              <div
                className={`${styles.workItem} ${selectedId === work.id ? styles.selected : ''}`}
                onClick={() => handleClick(work.id)}
              >
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <div className={styles.locationInfo}>
                  <p><strong>出発:</strong> {work.departure.city}</p>
                  <p><strong>到着:</strong> {work.arrival.city}</p>
                  <p><strong>依頼日:</strong> {work.requestDate}</p>
                </div>
              </div>
              {selectedId === work.id && (
                <div className={styles.detailBox}>
                  <h4>詳細情報</h4>
                  <p><strong>依頼者:</strong> {work.requester}</p>
                  <p><strong>荷物内容:</strong> {work.cargoDetails}</p>
                  <p><strong>料金:</strong> {work.price}円</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            前へ
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            次へ
          </button>
        </div>
      </div>
      <div className={styles.notListSection}>
        <div className={styles.Calendar}>
          <BodyEventCalendar />
        </div>
        <div className={styles.mapSection}>
          <NavMap work={selectedWork} />
        </div>
      </div>
    </div>
  );
} 
