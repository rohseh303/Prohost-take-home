import React from 'react';
import { type Listing, ListingGroup } from '../types/calendar';
import CalendarCell from './CalendarCell';

interface ListingRowProps {
  listing: Listing;
  days: ListingGroup;
  headerDates: Date[];
}

export default function ListingRow({ listing, days, headerDates }: ListingRowProps) {
  return (
    <div className="flex items-center border-b border-gray-200">
      <div className="flex">
        {headerDates.map((headerDate, index) => {
          const reservation = days.reservations.find(day => 
            new Date(day.check_in_at).toDateString() === headerDate.toDateString()
          );

          return (
            <div key={`${listing.id}-${headerDate.toISOString()}-${index}`}>
              {reservation ? (
                <CalendarCell day={reservation} />
              ) : (
                <CalendarCell />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}