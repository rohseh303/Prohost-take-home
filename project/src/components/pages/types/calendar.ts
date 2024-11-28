export interface Listing {
    id: string;
    name: string;
    image: string;
  }
  
  export interface Reservation {
    id: string;
    listingId: string;
    guestName: string;
    startDate: string;
    endDate: string;
    totalAmount: number;
    guestImage?: string;
  }
  
  export interface CalendarDay {
    date: string;
    price: number;
    reservation?: Reservation;
  }