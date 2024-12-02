import React from 'react';
import { type Reservation } from '../types/calendar';

interface CalendarCellProps {
  day?: Reservation;
}

const CalendarCell = React.memo(({ day }: CalendarCellProps) => {
  if (!day) {
    return (
      <div className="w-full h-full bg-white border-r border-b border-gray-100 p-2 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xs text-indigo-600">1D</span>
          <span className="text-sm font-medium text-gray-900">$100</span>
        </div>
      </div>
    );
  }

  const channelColor = day.channel === 'airbnb' ? 'bg-[#FF385C]' : 'bg-[#006CE4]';
  return (
    <div className="w-full h-full bg-white border-r border-b border-gray-100 p-2 flex items-center justify-center">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${channelColor}`}>
        <div className="flex items-center">
          <div className="w-6 h-6 flex-shrink-0">
            <img
              src={day.guest_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(day.guest_first_name + ' ' + day.guest_last_name)}&background=random`}
              alt={`${day.guest_first_name} ${day.guest_last_name}`}
              className="w-6 h-6 rounded-full"
            />
          </div>
          <div className="w-6 h-6 flex-shrink-0 -ml-3">
            <img
              src={`/assets/${day.channel}.png`}
              alt={`Booked on ${day.channel}`}
              className="w-6 h-6 rounded-full bg-white"
            />
          </div>
        </div>
        <span className="text-white text-xs truncate max-w-[80px]">
          {day.guest_first_name} {day.guest_last_name}
        </span>
      </div>
    </div>
  );
});

export default CalendarCell;