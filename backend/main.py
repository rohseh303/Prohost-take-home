from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, get_db
import models
import schemas
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

@app.get("/listings/")
def get_listings(db: Session = Depends(get_db)):
    listings = db.query(models.Listing).all()
    return listings

@app.get("/reservations/")
def get_reservations(db: Session = Depends(get_db)):
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
            # Add other reservation fields as needed
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