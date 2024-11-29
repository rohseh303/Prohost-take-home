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
                isToday ? 'bg-purple-100' : 'bg-white'
              }`}
            >
              <div className={`text-sm font-medium ${
                isToday ? 'text-purple-600' : 'text-gray-900'
              } flex flex-col items-center`}>
                <div>{new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short'
                })}</div>
                <div>{new Date(date).toLocaleDateString('en-US', { 
                  day: 'numeric'
                })}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}