from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2

# Database connection URL
DATABASE_URL = "postgresql://neondb_owner:xWol3Dtp5sfg@ep-crimson-forest-a5iww9qz.us-east-2.aws.neon.tech/backend?sslmode=require"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
