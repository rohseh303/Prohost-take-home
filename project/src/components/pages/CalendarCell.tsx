import React from 'react';
import { type Reservation } from '../../types/calendar';

interface CalendarCellProps {
  day?: Reservation;
}

const CalendarCell = React.memo(({ day }: CalendarCellProps) => {
  if (!day) {
    return (
      <div className="w-full h-full border-r border-b border-gray-100 p-2 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-indigo-600">1D</span>
          <span className="text-sm font-medium text-gray-900">$100</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-r border-b border-gray-100 p-2 flex items-center justify-center">
    </div>
  );
});

export default CalendarCell;