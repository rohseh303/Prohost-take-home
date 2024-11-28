import React from 'react';
import ReservationCalendar from './ReservationCalendar';
import { type Listing, type CalendarDay } from './types/calendar';
import { Header } from './Header';

const listings: Listing[] = [
  {
    id: '1',
    name: 'Luxury Condo',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'White Desert House',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Oceanfront Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=400&fit=crop',
  },
];

// Generate dates for the next 7 days
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split('T')[0];
});

// Sample calendar data
const calendarDays: Record<string, CalendarDay[]> = {
  '1': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
    ...(date === dates[2] && {
      reservation: {
        id: 'r1',
        listingId: '1',
        guestName: 'Emily Davis',
        startDate: dates[2],
        endDate: dates[4],
        totalAmount: 2910.56,
        guestImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
    }),
  })),
  '2': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
  })),
  '3': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
    ...(date === dates[4] && {
      reservation: {
        id: 'r2',
        listingId: '3',
        guestName: 'Mark Johnson',
        startDate: dates[4],
        endDate: dates[6],
        totalAmount: 1850.00,
        guestImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
    }),
  })),
};

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