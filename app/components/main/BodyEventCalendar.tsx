import React from 'react';
import styles from './BodyEventCalendar.module.css';
import CalendarContainer from './CalendarComponents/CalendarContainer';


export default function BodyEventCalendar() {
    return (
        <div className={styles.Container}>
            <div className={styles.calendarMain}>
            <CalendarContainer />
            </div>
        </div>
    );
}

