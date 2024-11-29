import React from 'react';
import { type CalendarDay } from '../types/calendar';
import { formatPrice } from '../utils/dateUtils';

interface CalendarCellProps {
  day: CalendarDay;
}

export default function CalendarCell({ day }: CalendarCellProps) {
  const isToday = new Date(day.date).toDateString() === new Date().toDateString();

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
          <span className="text-xs font-medium">{formatPrice(day.reservation.totalAmount)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-w-[120px] h-16 border-r border-gray-200 p-2 flex flex-col justify-center ${
      isToday ? 'bg-blue-50' : ''
    }`}>
      <span className="text-sm text-gray-900 text-center">{formatPrice(day.price)}</span>
      {new Date(day.date) >= new Date(new Date().setHours(0, 0, 0, 0)) && (
        <span className="text-xs text-purple-500 text-center">1D</span>
      )}
    </div>
  );
}