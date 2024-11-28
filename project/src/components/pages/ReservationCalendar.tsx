import React from 'react';
import { type Listing, type CalendarDay } from './types/calendar';
import ListingRow from './ListingRow';
import CalendarHeader from './CalendarHeader';

interface ReservationCalendarProps {
  listings: Listing[];
  calendarDays: Record<string, CalendarDay[]>;
  dates: string[];
}

export default function ReservationCalendar({ 
  listings,
  calendarDays,
  dates
}: ReservationCalendarProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <CalendarHeader dates={dates} />
        <div>
          {listings.map((listing) => (
            <ListingRow
              key={listing.id}
              listing={listing}
              days={calendarDays[listing.id] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}