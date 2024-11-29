import React, { useEffect, useState } from "react";
import ReservationCalendar from '../pages/ReservationCalendar';
import { calendarDays, dates } from '../data/sampleData';
import { Header } from './Header';
import { Listing } from '../types/calendar';
import { ListingsSidebar } from '../pages/ListingsSidebar';

export function CalendarPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/listings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        return response.json();
      })
      .then((data: Listing[]) => {
        // Ensure the fetched data matches the Listing type
        console.log("data:", data);
        setListings(data);
      })
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  console.log("listings:", listings);

  return (  
    <div className="space-y-4">
      <Header />
      <div className="flex gap-4">
        <ListingsSidebar listings={listings} />
        <div className="w-3/4">
          <ReservationCalendar
            listings={listings}
            calendarDays={calendarDays}
            dates={dates}
          />
        </div>
      </div>
    </div>
  );
} 