import React from 'react';
import { type Reservation } from '../types/calendar';
import { formatPrice } from '../utils/dateUtils';

interface CalendarCellProps {
  day?: Reservation;
}

const CalendarCell = React.memo(({ day }: CalendarCellProps) => {
  const randomAmount = Math.floor(Math.random() * 101) + 100;

  if (!day) {
    return (
      <div className="w-full h-full bg-gray-200 text-gray-500 p-2 flex items-center justify-center">
        <div className="flex flex-col">
          <span className="text-xs">1D</span>
          <span className="text-xs font-medium">
            {formatPrice(randomAmount)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-blue-600 text-white p-2 flex items-center gap-2">
      <img
        src={
          'https://ui-avatars.com/api/?name=' +
          day.guest_first_name +
          ' ' +
          day.guest_last_name
        }
        alt={day.guest_first_name + ' ' + day.guest_last_name}
        className="w-6 h-6 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-xs">
          {day.guest_first_name} {day.guest_last_name}
        </span>
        <span className="text-xs font-medium">
          {formatPrice(randomAmount)}
        </span>
      </div>
    </div>
  );
});

export default CalendarCell;
