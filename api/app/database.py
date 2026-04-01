from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

DATABASE_URL = str(os.getenv("DATABASE_URL"))
engine = create_engine(DATABASE_URL)

# SessionLocal for db sessions = one per taransaction
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# class for our models to inherit from
Base = declarative_base()

def get_db():
    db = session_local()
    try:
        yield db # supendsion for db session, will be closed after request is done
    finally:
        db.close() # close db session after request is done