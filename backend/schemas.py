from datetime import datetime
from uuid import UUID
from pydantic import BaseModel
from typing import List

class Reservation(BaseModel):
    id: UUID
    listing_id: UUID
    account_id: UUID
    channel_id: int
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

class Listing(BaseModel):
    id: int
    title: str
    description: str
    reservations: List[Reservation] = []

    class Config:
        orm_mode = True
