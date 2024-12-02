import React from 'react';
import { Listing } from '../types/calendar';

interface ListingsSidebarProps {
  listings: Listing[];
}

export function ListingsSidebar({ listings }: ListingsSidebarProps) {
  return (
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-4 p-9 border-b">
        <h2 className="text-lg font-semibold">Listings</h2>
        <button className="p-1">≡</button>
      </div>
      <div className="space-y-2">
        {listings.map((listing) => (
          <div 
            key={listing.id} 
            className="flex items-center gap-3 p-2 hover:bg-gray-50 border-b"
          >
            <img 
              src={listing.photo_url} 
              alt={listing.title}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-medium text-[15px] leading-5 text-gray-900">
              {listing.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 