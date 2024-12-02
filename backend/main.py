from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from .database import Base, engine, get_db
from . import models
from . import schemas
import random
import logging
from collections import defaultdict

# Create database tables
Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://10.0.0.33:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/listings/")
# def get_listings(db: Session = Depends(get_db)):
#     listings = db.query(models.Listing).all()
#     return listings

@app.get("/listings/")
def get_listings(db: Session = Depends(get_db)):
    # Query all listings
    listings = db.query(models.Listing).all()

    # Fetch photos for each listing
    photo_map = {
        photo.listing_id: photo.url
        for photo in db.query(models.ListingPhoto).all()
    }

    # Fetch reservations for each listing
    # reservation_map = defaultdict(list)
    # for reservation in db.query(models.Reservation).all():
    #     reservation_map[reservation.listing_id].append({
    #         "id": reservation.id,
    #         "check_in_at": reservation.check_in_at,
    #         "check_out_at": reservation.check_out_at,
    #         "guest_first_name": reservation.guest_first_name,
    #         "guest_last_name": reservation.guest_last_name,
    #         "guest_photo_url": reservation.guest_photo_url,
    #     })

    # Construct the final response
    result = [
        {
            "id": listing.id,
            "title": listing.title,
            "description": listing.description,
            "photo_url": photo_map.get(listing.id),  # Get photo URL
            # "reservations": reservation_map.get(listing.id, [])  # Get reservations
        }
        for listing in listings
    ]

    return result


@app.get("/reservations/")
def get_reservations(db: Session = Depends(get_db)):
    # Fetch reservation channels and build a map
    print("Fetching reservation channels")
    channel_map = {
        channel.id: channel.channel
        for channel in db.query(models.ReservationChannel).all()
    }
    print("channel_map: ", channel_map)

    # Query all reservations
    reservations = db.query(models.Reservation).all()

    # Group reservations by listing_id
    listing_reservations = defaultdict(list)

    for reservation in reservations:
        listing_reservations[str(reservation.listing_id)].append({
            "id": reservation.id,
            "check_in_at": reservation.check_in_at,
            "check_out_at": reservation.check_out_at,
            "guest_first_name": reservation.guest_first_name,
            "guest_last_name": reservation.guest_last_name,
            "guest_photo_url": reservation.guest_photo_url,
            "channel_id": reservation.channel_id,
            "channel": channel_map.get(reservation.channel_id, "UNKNOWN")  # Use the map to get the channel name
        })

    # Convert to final format
    result = [
        {
            "listing_id": listing_id,
            "reservations": reservations_list
        }
        for listing_id, reservations_list in listing_reservations.items()
    ]

    return result
