"use client"
import React, { useRef } from 'react';
import FullCalendar, { DateClickArg, EventClickArg, DateSelectArg } from "@fullcalendar/react";
// import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from './BodyCalendar.module.css';
import { Event } from './useEvents';

// FullCalendarのコールバック引数型を型安全に定義
interface DateClickInfo {
  dateStr: string;
}
interface EventClickInfo {
  event: { title: string };
}
interface DateSelectInfo {
  startStr: string;
}

type BodyCalendarProps = {
  onDateSelect: (date: string) => void;
  events: Event[];
};

const BodyCalendar: React.FC<BodyCalendarProps> = ({ onDateSelect, events }) => {
  const ref = useRef<FullCalendar | null>(null);

  // イベントクリック時のハンドラー
  const handleClick = (info: EventClickInfo) => {
    console.log('Event clicked:', info.event.title);
  };

  // 日付範囲選択時のハンドラー
  const handleSelect = (info: DateSelectInfo) => {
    console.log('Date selected:', info.startStr);
  };

  // 日付クリック時のハンドラー
  const handleDateClick = (info: DateClickInfo) => {
    onDateSelect(info.dateStr);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        locale='ja' // 言語を日本語に設定
        allDayText="終日" // 「終日」の表示用テキスト
        height="auto" // ヘッダーとフッターを含むカレンダー全体の高さを設定する
        plugins={[timeGridPlugin,dayGridPlugin,interactionPlugin]}// プラグインを読み込む
        initialView="dayGridMonth"// カレンダーが読み込まれたときの初期ビュー
        slotDuration="00:30:00" // タイムスロットを表示する頻度。
        selectable={true}
        businessHours={{
          daysOfWeek:[1,2,3,4,5],
          startTime:"00:00",
          endTime:"24:00"
        }}
        weekends={true}
        titleFormat={{
          year:"numeric",
          month:"short"
        }}
        headerToolbar={{
          start:"title",
          center:"prev,next,today",
          end:"dayGridMonth,timeGridWeek"
        }}
        ref={ref}
        eventClick={handleClick}
        select={handleSelect}
        dateClick={handleDateClick}
        events={events.map((event: Event) => ({
          title: event.title,
          date: event.date,
          display: 'background',
          color: 'var(--primary-blue)'
        }))}
      />
    </div>
  );
};

export default BodyCalendar;