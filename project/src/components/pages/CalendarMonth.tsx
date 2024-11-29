import React, { useEffect, useState } from 'react'

interface CalendarMonthProps {
  currentDay: string | null;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ currentDay }) => {
  // Handle scroll event to update the month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (currentDay) {
      const [year, month, day] = currentDay.split('-').map(Number);
      const date = new Date(year, month - 1, day); 

      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, [currentDay]);

  return (
    <h2 className="text-lg font-bold">
      {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
    </h2>
  )
}

export default CalendarMonth