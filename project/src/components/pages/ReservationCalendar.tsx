import React, { useRef, useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { addDays, parseISO, differenceInDays } from 'date-fns';
import { Reservation, type Listing, type ListingGroup } from '../types/calendar';
import ListingRow from './ListingRow';
import CalendarHeader from './CalendarHeader';
import CalendarMonth from './CalendarMonth';
import CalendarCell from './CalendarCell';

interface ReservationCalendarProps {
  listings: Listing[];
  reservations: ListingGroup[];
  earliestCheckIn: string | null;
  latestCheckOut: string | null;
}

export default function ReservationCalendar({ 
  listings,
  reservations,
  earliestCheckIn,
  latestCheckOut
}: ReservationCalendarProps) {
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Generate header dates based on earliestCheckIn and latestCheckOut
  const headerDates: Date[] = [];
  let columnCount = 0;

  if (earliestCheckIn && latestCheckOut) {
    const startDate = parseISO(earliestCheckIn);
    const endDate = parseISO(latestCheckOut);
    columnCount = differenceInDays(endDate, startDate) + 1;

    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      headerDates.push(date);
    }
  }

  const rowCount = listings.length + 1;
  const cellWidth = 120;
  const cellHeight = 80;

  // Prepare a map for quick reservation lookup
  const reservationMap: { [key: string]: { [key: string]: Reservation } } = {};

  reservations.forEach((group) => {
    reservationMap[group.listing_id] = {};
    group.reservations.forEach((res) => {
      const dateKey = new Date(res.check_in_at).toLocaleDateString('en-CA');
      reservationMap[group.listing_id][dateKey] = res;
    });
  });

  // Cell renderer for the grid
  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    if (rowIndex === 0) {
      // Header row
      const date = headerDates[columnIndex];
      const dateString = date.toISOString().split('T')[0];
      const isToday = dateString === new Date().toISOString().split('T')[0];

      return (
        <div
          style={{
            ...style,
            backgroundColor: isToday ? '#E5E7EB' : '#F9FAFB',
            borderRight: '1px solid #E5E7EB',
            borderBottom: '1px solid #E5E7EB',
            boxSizing: 'border-box',
          }}
        >
          <div
            className={`text-sm font-medium ${
              isToday ? 'text-purple-600' : 'text-gray-400'
            } flex flex-col items-center`}
          >
            <div>
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </div>
            <div>
              {date.toLocaleDateString('en-US', {
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      );
    } else {
      // Listing rows
      const listing = listings[rowIndex - 1];
      const date = headerDates[columnIndex];
      const dateString = date.toISOString().split('T')[0];
      const reservation =
        reservationMap[listing.id] &&
        reservationMap[listing.id][dateString];

      return (
        <div
          style={{
            ...style,
            borderRight: '1px solid #E5E7EB',
            borderBottom: '1px solid #E5E7EB',
            boxSizing: 'border-box',
          }}
        >
          <CalendarCell day={reservation} />
        </div>
      );
    }
  };

  const gridRef = useRef<any>(null);

  const handleScroll = ({ scrollLeft }: { scrollLeft: number }) => {
    // You can update the current day based on scrollLeft
    const visibleColumnIndex = Math.floor(scrollLeft / cellWidth);
    const date = headerDates[visibleColumnIndex];
    if (date) {
      const dateString = date.toLocaleDateString('en-CA');
      setCurrentDay(dateString);
    }
  };

  useEffect(() => {
    if (gridRef.current && earliestCheckIn && latestCheckOut) {
      const today = new Date();
      const startDate = parseISO(earliestCheckIn);
      const endDate = parseISO(latestCheckOut);
  
      // Check if today is within the range
      if (today >= startDate && today <= endDate) {
        const index = differenceInDays(today, startDate);
  
        gridRef.current.scrollToItem({
          columnIndex: index,
          rowIndex: 0,
          align: 'start', // You can adjust this to 'center' or 'end' if needed
        });
      }
    }
  }, [gridRef.current, earliestCheckIn, latestCheckOut]);  

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative">
        <CalendarMonth currentDay={currentDay} />
        <div className="w-full">
          {/* Shared scroll container */}
          <div
            className="overflow-auto"
            ref={scrollContainerRef}
            style={{ position: 'relative', height: '600px' }} // Adjust height as needed
          >
            <Grid
              ref={gridRef}
              onScroll={handleScroll}
              columnCount={columnCount}
              columnWidth={cellWidth}
              height={600}
              rowCount={rowCount}
              rowHeight={cellHeight}
              width={window.innerWidth}
            >
              {Cell}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}