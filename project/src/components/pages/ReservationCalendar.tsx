import React, { useRef, useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { addDays, parseISO, differenceInDays } from 'date-fns';
import throttle from 'lodash.throttle';
import { Reservation, type Listing, type ListingGroup } from '../types/calendar';
import CalendarMonth from './CalendarMonth';
import CalendarCell from './CalendarCell';
import ReservationBar from './ReservationBar';

interface ReservationCalendarProps {
  listings: Listing[];
  reservations: ListingGroup[];
  earliestCheckIn: string;
  latestCheckOut: string;
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
  const cellHeight = 82;

  // Prepare a map for quick reservation lookup
  const reservationMap: { [key: string]: { [key: string]: Reservation } } = {};

  reservations.forEach((group) => {
    reservationMap[group.listing_id] = {};
    group.reservations.forEach((res) => {
      const dateKey = new Date(res.check_in_at).toLocaleDateString('en-CA');
      reservationMap[group.listing_id][dateKey] = res;
    });
  });

  // Calculate reservation positions
  const reservationPositions = reservations.flatMap((group) => {
    return group.reservations.map((res) => {
      const startDate = parseISO(earliestCheckIn);
      const checkInDate = parseISO(res.check_in_at);
      const checkOutDate = parseISO(res.check_out_at);
  
      const startIndex = differenceInDays(checkInDate, startDate);
      const endIndex = differenceInDays(checkOutDate, startDate);
      // const span = endIndex - startIndex;
      const span = Math.max(1, endIndex - startIndex);
  
      const position = {
        ...res,
        listingId: group.listing_id,
        startIndex,
        span,
        rowIndex: listings.findIndex((listing) => listing.id === group.listing_id) + 1, // +1 for header row
      };
      if (res.guest_first_name === 'Sujin') {
        console.log("Reservation position: ", position);
      }
      return position;
    });
  });

  const InnerGridElement = React.forwardRef(({ style, ...rest }, ref) => (
    <div ref={ref} style={{ ...style, position: 'relative' }} {...rest}>
      {/* Render the grid cells */}
      {rest.children}
  
      {/* Overlay reservation bars */}
      {reservationPositions.map((reservation) => (
        <ReservationBar
          key={reservation.id}
          reservation={reservation}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          // columnCount={columnCount}
        />
      ))}
    </div>
  ));  

  // Cell renderer for the grid
  const Cell = React.memo(({ columnIndex, rowIndex, style }: any) => {
    if (rowIndex === 0) {
      // Header row
      const date = headerDates[columnIndex];
      const dateString = date.toISOString().split('T')[0];
      const isToday = dateString === new Date().toISOString().split('T')[0];

      return (
        <div
          style={{
            ...style,
            backgroundColor: isToday ? '#E5E7EB' : '#FFFFFF',
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

      // Check if this cell is part of a reservation bar
      const isReservationCell = reservationPositions.some(
        (res) =>
          res.rowIndex === rowIndex &&
          columnIndex >= res.startIndex &&
          columnIndex < res.startIndex + res.span
      );

      if (isReservationCell) {
        // Return an empty cell to prevent duplicate rendering
        return <div style={{
          ...style,
          borderRight: '1px solid #E5E7EB',
          borderBottom: '1px solid #E5E7EB',
          boxSizing: 'border-box',
        }} />;
      }

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
  },
  (prevProps, nextProps) =>
    prevProps.columnIndex === nextProps.columnIndex &&
    prevProps.rowIndex === nextProps.rowIndex
  );

  const gridRef = useRef<any>(null);

  const handleScroll = throttle(({ scrollLeft }: { scrollLeft: number }) => {
    const visibleColumnIndex = Math.floor(scrollLeft / cellWidth);
    const date = headerDates[visibleColumnIndex];
    if (date) {
      const dateString = date.toLocaleDateString('en-CA');
      setCurrentDay(dateString);
    }
  }, 150);

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
        <div className="w-5/5">
          {/* Shared scroll container */}
          <div
            // className="overflow-auto"
            className="overflow-auto scrollbar-hide"
            ref={scrollContainerRef}
            style={{ position: 'relative', height: '100%' }} // Adjust height as needed
          >
            <Grid
              ref={gridRef}
              onScroll={handleScroll}
              columnCount={columnCount}
              columnWidth={cellWidth}
              // height={Infinity}
              height={rowCount * cellHeight}
              rowCount={rowCount}
              rowHeight={cellHeight}
              width={1200}
              innerElementType={InnerGridElement}
              overscanColumnCount={30}
            >
              {Cell}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}