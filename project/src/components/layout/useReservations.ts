import { useState, useEffect } from 'react';
import { ListingGroup } from '../types/calendar';

export function useReservations() {
  const [reservations, setReservations] = useState<ListingGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [earliestCheckIn, setEarliestCheckIn] = useState<string | null>(null);
  const [latestCheckOut, setLatestCheckOut] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      // console.log("fetching reservations");
      try {
        const response = await fetch('http://127.0.0.1:8000/reservations/');
        if (!response.ok) {
          throw new Error(`Error fetching reservations: ${response.status}`);
        }
        const data: ListingGroup[] = await response.json();

        if (data.length > 0) {
          // console.log("data:", data);
          const allCheckInDates: string[] = [];
          const allCheckOutDates: string[] = [];

          data.forEach((listingGroup) => {
            listingGroup.reservations.forEach((reservation) => {
              allCheckInDates.push(new Date(reservation.check_in_at).toISOString());
              allCheckOutDates.push(new Date(reservation.check_out_at).toISOString());
            });
          });

          if (allCheckInDates.length > 0) {
            setEarliestCheckIn(
              new Date(
                Math.min(...allCheckInDates.map((date) => new Date(date).getTime()))
              ).toISOString()
            );
          }

          if (allCheckOutDates.length > 0) {
            setLatestCheckOut(
              new Date(
                Math.max(...allCheckOutDates.map((date) => new Date(date).getTime()))
              ).toISOString()
            );
          }
        }

        setReservations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reservations');
      } finally {
        setIsLoading(false);
      }
    }

    fetchReservations();
  }, []);

  return { reservations, isLoading, error, earliestCheckIn, latestCheckOut };
}
