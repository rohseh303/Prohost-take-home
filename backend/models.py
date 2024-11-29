from sqlalchemy import Column, Integer, String, DateTime, UUID
from sqlalchemy.sql import func
from database import Base

class Listing(Base):
    __tablename__ = "listings"
    id = Column(UUID, primary_key=True)
    title = Column(String)
    description = Column(String)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(UUID, primary_key=True)
    listing_id = Column(UUID)
    guest_first_name = Column(String, nullable=True)
    guest_last_name = Column(String, nullable=True)
    check_in_at = Column(DateTime(timezone=True), nullable=True)
    check_out_at = Column(DateTime(timezone=True), nullable=True)
    guest_photo_url = Column(String, nullable=True)

    # Commented out fields for future use if needed
    """
    account_id = Column(UUID)
    channel_id = Column(Integer)
    guest_email = Column(String, nullable=True)
    guest_phone = Column(String, nullable=True)
    guest_address = Column(String, nullable=True)
    guest_city = Column(String, nullable=True)
    guest_country = Column(String, nullable=True)
    guest_postal_code = Column(String, nullable=True)
    num_nights = Column(Integer, nullable=True)
    num_adults = Column(Integer, nullable=True)
    num_children = Column(Integer, nullable=True)
    num_infants = Column(Integer, nullable=True)
    num_pets = Column(Integer, nullable=True)
    status = Column(Integer, nullable=True)
    status_detail = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    source_id = Column(Integer, nullable=True)
    source_reservation_id = Column(String, nullable=True)
    source_conversation_id = Column(String, nullable=True)
    booked_at = Column(DateTime(timezone=True), nullable=True)
    """