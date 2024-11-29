from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, get_db
import models
import schemas
import random
import logging

# Create database tables
Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://10.0.0.33:3000"
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

@app.post("/reservations/", response_model=schemas.Reservation)
def create_reservation(reservation: schemas.ReservationCreate, db: Session = Depends(get_db)):
    db_reservation = models.Reservation(**reservation.dict())
    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return db_reservation

@app.get("/calendar/{listing_id}")
def get_calendar(listing_id: int, db: Session = Depends(get_db)):
    db_listing = db.query(models.Listing).filter(models.Listing.id == listing_id).first()
    if db_listing is None:
        raise HTTPException(status_code=404, detail="Listing not found")

    calendar = {
        "listing_id": listing_id,
        "prices": {
            f"2024-12-{day:02}": random.randint(100, 200)
            for day in range(1, 31)
        },
    }
    return calendar