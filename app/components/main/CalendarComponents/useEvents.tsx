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
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('イベントの取得に失敗しました');
        }
        const data = await response.json();
        // timeプロパティがなければ空文字列で補完
        setEvents(data.map((event: Partial<Event>) => ({
          id: event.id ?? '',
          title: event.title ?? '',
          date: event.date ?? '',
          time: event.time ?? '',
        })));
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