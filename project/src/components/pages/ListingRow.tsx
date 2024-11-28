import React from 'react';
import { type Listing, type CalendarDay } from '../types/calendar';
import CalendarCell from './CalendarCell';

interface ListingRowProps {
  listing: Listing;
  days: CalendarDay[];
}

export default function ListingRow({ listing, days }: ListingRowProps) {
  return (
    <div className="flex items-center border-b border-gray-200">
      <div className="flex items-center gap-2 min-w-[200px] p-4 bg-white sticky left-0 z-10 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-8 h-8 rounded-lg object-cover"
        />
        <span className="font-medium text-sm text-gray-900">{listing.name}</span>
      </div>
      <div className="flex">
        {days.map((day, index) => (
          <CalendarCell key={`${listing.id}-${day.date}-${index}`} day={day} />
        ))}
      </div>
    </div>
  );
}