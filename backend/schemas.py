from pydantic import BaseModel
from typing import List, Optional

class ReservationBase(BaseModel):
    guest_name: str
    check_in: str
    check_out: str

class ReservationCreate(ReservationBase):
    listing_id: int

class Reservation(ReservationBase):
    id: int

    class Config:
        orm_mode = True

class ListingBase(BaseModel):
    title: str
    description: str

class ListingCreate(ListingBase):
    pass

class Listing(ListingBase):
    id: int
    reservations: List[Reservation] = []

    class Config:
        orm_mode = True
