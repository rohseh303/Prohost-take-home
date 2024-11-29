from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)

    reservations = relationship("Reservation", back_populates="listing")

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    guest_name = Column(String, index=True)
    check_in = Column(String, index=True)
    check_out = Column(String, index=True)

    listing = relationship("Listing", back_populates="reservations")
