export interface Listing {
  id: string;
  title: string;
  description: string;
  photo_url: string;
}

export interface Reservation {
  id: string;
  guest_first_name: string;
  guest_last_name: string;
  check_in_at: string;
  check_out_at: string;
  guest_photo_url?: string;
  channel: string;
}

export interface ListingGroup {
  listing_id: string;
  reservations: Reservation[];
}