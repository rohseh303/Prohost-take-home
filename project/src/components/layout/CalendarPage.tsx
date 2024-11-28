import React from 'react';
import ReservationCalendar from '../pages/ReservationCalendar';
import { listings, calendarDays, dates } from '../data/sampleData';
import { Header } from './Header';

export function CalendarPage() {
  return (  
    <div className="space-y-4">
      <Header />
      <div className="flex gap-4">
        <div className="w-1/4">
          <div className="flex items-center justify-between mb-4 p-5 border-b">
            <h2 className="text-lg font-semibold">Listings</h2>
            <button className="p-1">≡</button>
          </div>
          <div className="space-y-2">
            {listings.map((listing) => (
              <div 
                key={listing.id} 
                className="flex items-center gap-3 p-2 hover:bg-gray-50 border-b"
              >
                <img 
                  src={listing.image} 
                  alt={listing.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-sm">{listing.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <ReservationCalendar
            listings={listings}
            calendarDays={calendarDays}
            dates={dates}
          />
        </div>
      </div>
    </div>
  );
} 