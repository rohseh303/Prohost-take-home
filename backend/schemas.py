from datetime import datetime
from uuid import UUID
from pydantic import BaseModel
from typing import List

class Reservation(BaseModel):
    id: UUID
    listing_id: UUID
    account_id: UUID
    channel_id: int
    channel: str | None
    guest_first_name: str
    guest_last_name: str
    guest_email: str
    guest_phone: str
    guest_photo_url: str | None
    guest_address: str | None
    guest_city: str | None
    guest_country: str | None
    guest_postal_code: str | None
    num_nights: int
    num_adults: int
    num_children: int
    num_infants: int
    num_pets: int
    check_in_at: datetime
    check_out_at: datetime
    status: int
    status_detail: int
    created_at: datetime
    updated_at: datetime
    source_id: int | None
    source_reservation_id: str | None
    source_conversation_id: str | None
    booked_at: datetime | None

    class Config:
        orm_mode = True

class ListingPhoto(BaseModel):
    id: int
    listing_id: UUID
    url: str

    class Config:
        orm_mode = True

class Listing(BaseModel):
    id: UUID
    title: str
    description: str
    photo_url: str | None
    reservations: List[Reservation] = []

    class Config:
        orm_mode = True