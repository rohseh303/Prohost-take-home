import React, { useRef, useEffect } from 'react';
import { type Listing, type CalendarDay } from '../types/calendar';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to today's date on initial load
    if (scrollContainerRef.current) {
      const today = new Date().toISOString().split('T')[0];
      const todayIndex = dates.indexOf(today);
      const cellWidth = 120; // width of each cell
      const scrollPosition = Math.max(0, (todayIndex * cellWidth) - (window.innerWidth / 2) + 200);
      scrollContainerRef.current.scrollLeft = scrollPosition+600;
    }
  }, [dates]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative">
        {/* Horizontal scrollable container */}
        <div 
          className="overflow-x-auto w-full"
          ref={scrollContainerRef}
        >
          {/* Sticky header for the calendar */}
          <div className="sticky top-0 z-20 bg-white">
            <CalendarHeader dates={dates} />
          </div>

          {/* Grid for rows */}
          <div
            className="grid grid-flow-row auto-cols-[120px] w-max" 
          >
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
    </div>
  );
}
