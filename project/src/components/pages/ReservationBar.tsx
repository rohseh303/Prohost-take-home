import React from 'react'
// import { formatPrice } from '../utils/dateUtils';
import { Reservation } from '../types/calendar';

interface ReservationPosition extends Reservation {
    listingId: string;
    startIndex: number;
    span: number;
    rowIndex: number;
  }

interface ReservationBarProps {
    reservation: ReservationPosition;
    cellWidth: number;
    cellHeight: number;
  }

const ReservationBar: React.FC<ReservationBarProps> = ({ reservation, cellWidth, cellHeight }) => {
    if (reservation.guest_first_name === 'Matthew' || reservation.guest_first_name === 'Jessica') {
        console.log(reservation.guest_first_name, reservation.guest_last_name, reservation.startIndex, reservation.span, reservation.check_in_at, reservation.check_out_at);
    }
    const { startIndex, span, rowIndex } = reservation;
    const left = (startIndex + 1) * cellWidth + cellWidth / 2;
    const width = (span * cellWidth) - 25;

    const top = rowIndex * cellHeight;    
    const barHeight = cellHeight * 0.6; // 60% of cell height
    const barTopOffset = (cellHeight - barHeight) / 2;

    const isPastReservation = new Date(reservation.check_out_at).getTime() < new Date().setHours(0, 0, 0, 0);
    const isPresentReservation = new Date(reservation.check_in_at).getTime() <= new Date().setHours(23, 59, 59, 999) 
        && new Date(reservation.check_out_at).getTime() > new Date().setHours(0, 0, 0, 0);

    return (
      <div
        style={{
          position: 'absolute',
          left,
          top: top + barTopOffset,
          width: width - 2,
          height: barHeight,
          backgroundColor: isPastReservation
            ? '#eaecf0'
            : isPresentReservation
            ? '#533ef2'
            : '#000000',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 8px',
          zIndex: 1,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Only show guest info at the start */}
          <img
            src={reservation.guest_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(reservation.guest_first_name + ' ' + reservation.guest_last_name)}&background=random`}
            alt={`${reservation.guest_first_name} ${reservation.guest_last_name}`}
            style={{
              filter: isPastReservation ? 'grayscale(110%)' : 'none',
            }}
            className="w-6 h-6 rounded-full"
          />
          <img
            src={`/assets/${reservation.channel.toLowerCase()}.png`}
            alt={`Booked on ${reservation.channel}`}
            style={{
              filter: isPastReservation ? 'grayscale(110%)' : 'none',
            }}
            className="w-6 h-6 rounded-full bg-white p-1 -ml-3"
          />
          <span className="text-white text-xs truncate ml-2">
            {reservation.guest_first_name} {reservation.guest_last_name}
            <span className="ml-2 font-semibold">
              $100
            </span>
          </span>
      </div>
    );
  }
  
export default ReservationBar