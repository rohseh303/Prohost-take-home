import React from 'react';
import { type CalendarDay } from './types/calendar';

interface CalendarCellProps {
  day: CalendarDay;
}

export default function CalendarCell({ day }: CalendarCellProps) {
  if (day.reservation) {
    return (
      <div className="min-w-[120px] h-16 bg-blue-600 text-white p-2 flex items-center gap-2">
        <img
          src={day.reservation.guestImage || 'https://ui-avatars.com/api/?name=' + day.reservation.guestName}
          alt={day.reservation.guestName}
          className="w-6 h-6 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-xs">{day.reservation.guestName}</span>
          <span className="text-xs font-medium">${day.reservation.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[120px] h-16 border-r border-gray-200 p-2 flex flex-col justify-center">
      <span className="text-sm text-gray-900">${day.price}</span>
      <span className="text-xs text-gray-500">1D</span>
    </div>
  );
}