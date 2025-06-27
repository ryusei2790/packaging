import React from 'react';
import styles from './BodyNavCalendar.module.css';
import { Event } from './useEvents';

type BodyNavCalendarProps = {
  selectedDate: string | null;
  events: Event[];
};

const BodyNavCalendar: React.FC<BodyNavCalendarProps> = ({ selectedDate, events }) => {
  // 選択された日付のイベントをフィルタリング
  const selectedEvents = events?.filter(event => 
    event.date === selectedDate
  ) || [];

  return (
    <div className={styles.eventDetails}>
      <h3 className={styles.eventDetailsTitle}>
        {selectedDate ? `${selectedDate}のイベント` : 'イベントを選択してください'}
      </h3>
      {selectedEvents.length > 0 ? (
        <ul className={styles.eventList}>
          {selectedEvents.map((event, index) => (
            <li key={index} className={styles.eventItem}>
              <span className={styles.eventTime}>{event.time}</span>
              <span className={styles.eventTitle}>{event.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noEvents}>イベントはありません</p>
      )}
    </div>
  );
};

export default BodyNavCalendar; 