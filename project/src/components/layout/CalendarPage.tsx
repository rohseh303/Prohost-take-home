import React, { useEffect, useState } from "react";
import ReservationCalendar from '../pages/ReservationCalendar';
import { Header } from './Header';
import { Listing } from '../types/calendar';
import { ListingsSidebar } from '../pages/ListingsSidebar';
import { useReservations } from './useReservations';

export function CalendarPage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    let retries = 3;
    const fetchData = () => fetch("http://127.0.0.1:8000/listings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        return response.json();
      })
      .then((data: Listing[]) => {
        setListings(data);
      })
      .catch((error) => {
        if (retries > 0) {
          retries--;
          setTimeout(fetchData, 1000); // Retry after 1 second
        } else {
          console.error("Error fetching listings:", error);
        }
      });
      
    fetchData();
  }, []);
  
  const { reservations, isLoading, error, earliestCheckIn, latestCheckOut } = useReservations();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  return (  
    <div className="space-y-4">
      <Header />
      <div className="flex gap-4">
        <div className="w-1/4">
          <ListingsSidebar listings={listings} />
        </div>
        <div className="w-3/4">
          <ReservationCalendar
            listings={listings}
            reservations={reservations}
            earliestCheckIn={earliestCheckIn}
            latestCheckOut={latestCheckOut}
          />
        </div>
      </div>
    </div>
  );
} 