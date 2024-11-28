import React from 'react';
import ReservationCalendar from '../pages/ReservationCalendar';
import { listings, calendarDays, dates } from '../data/sampleData';
import { Header } from './Header';

export function CalendarPage() {
  return (  
    <div className="space-y-4">
      <Header />
      <ReservationCalendar
          listings={listings}
          calendarDays={calendarDays}
          dates={dates}
        />
    </div>
  );
} 