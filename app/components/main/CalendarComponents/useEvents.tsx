"use client"
import { useState, useEffect } from 'react';

// イベントの型を定義（必要に応じて修正してください）
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  // 必要に応じて他のプロパティを追加
};

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ここで実際のAPIエンドポイントに置き換えてください
        const response = await fetch('/data/works.json');
        if (!response.ok) {
          throw new Error('イベントの取得に失敗しました');
        }
        const data = await response.json();
        
        // works.jsonの構造に合わせて変換
        const convertedEvents = data.works.map((work: any) => {
          const requestDate = new Date(work.requestDate);
          return {
            id: work.id.toString(),
            title: work.title,
            date: requestDate.toISOString().split('T')[0], // YYYY-MM-DD形式
            time: requestDate.toTimeString().split(' ')[0], // HH:MM:SS形式
          };
        });
        
        setEvents(convertedEvents);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useEvents; 