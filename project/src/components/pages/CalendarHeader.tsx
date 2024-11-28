import React from 'react';

interface CalendarHeaderProps {
  dates: string[];
}

export default function CalendarHeader({ dates }: CalendarHeaderProps) {
  return (
    <div className="flex border-b border-gray-200">
      <div className="min-w-[200px] p-4 bg-white sticky left-0 z-10 border-r border-gray-200">
        <span className="font-medium text-sm text-gray-900">Listings</span>
      </div>
      <div className="flex">
        {dates.map((date) => (
          <div key={date} className="min-w-[120px] p-4 border-r border-gray-200">
            <div className="text-sm font-medium text-gray-900">
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}