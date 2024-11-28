import React from 'react';

interface CalendarHeaderProps {
  dates: string[];
}

export default function CalendarHeader({ dates }: CalendarHeaderProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex border-b border-gray-200">
      <div className="flex">
        {dates.map((date) => {
          const isToday = date === today;
          return (
            <div 
              key={date} 
              className={`min-w-[120px] p-4 border-r border-gray-200 ${
                isToday ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="text-sm font-medium text-gray-900">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}