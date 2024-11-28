import { type Listing, type CalendarDay } from '../types/calendar';
import { generateDateRange } from '../utils/dateUtils';

// Generate dates for 30 days back and 30 days forward
export const dates = generateDateRange(30, 30);

export const listings: Listing[] = [
  {
    id: '1',
    name: 'Luxury Condo',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'White Desert House',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Oceanfront Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=400&fit=crop',
  },
];

export const calendarDays: Record<string, CalendarDay[]> = {
  '1': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
    ...(date === dates[32] && {
      reservation: {
        id: 'r1',
        listingId: '1',
        guestName: 'Emily Davis',
        startDate: dates[32],
        endDate: dates[34],
        totalAmount: 2910.56,
        guestImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
    }),
    ...(date === dates[15] && {
      reservation: {
        id: 'r4',
        listingId: '1',
        guestName: 'Sarah Wilson',
        startDate: dates[15],
        endDate: dates[18],
        totalAmount: 1850.00,
        guestImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
    }),
  })),
  '2': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
    ...(date === dates[10] && {
      reservation: {
        id: 'r2',
        listingId: '2',
        guestName: 'James Brown',
        startDate: dates[10],
        endDate: dates[14],
        totalAmount: 3245.00,
        guestImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    }),
  })),
  '3': dates.map((date) => ({
    date,
    price: Math.floor(Math.random() * 300) + 100,
    ...(date === dates[40] && {
      reservation: {
        id: 'r3',
        listingId: '3',
        guestName: 'Mark Johnson',
        startDate: dates[40],
        endDate: dates[44],
        totalAmount: 1850.00,
        guestImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      },
    }),
    ...(date === dates[5] && {
      reservation: {
        id: 'r5',
        listingId: '3',
        guestName: 'Alex Chen',
        startDate: dates[5],
        endDate: dates[8],
        totalAmount: 2100.00,
        guestImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
    }),
  })),
};