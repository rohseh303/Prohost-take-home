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
      <div className="flex">
        {days.map((day, index) => (
          <CalendarCell key={`${listing.id}-${day.date}-${index}`} day={day} />
        ))}
      </div>
    </div>
  );
}