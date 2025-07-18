from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Define the database URL
DB_URL = "postgresql://postgres:postgres@localhost:5432/lims"

# Create an engine
engine = create_engine(DB_URL)

# Create a configured session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()