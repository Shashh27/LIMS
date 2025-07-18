from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from Database.db import engine, get_db
from Routers import quotation , auth , testing_r1 , equipments
from orm_models.models import AdditionalCalibrationCharges, Base, CalibrationCharges
from fastapi.middleware.cors import CORSMiddleware


# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to LIMS API"}

@app.get("/calibration_charges/")
def get_calibration_charges(db: Session = Depends(get_db)):
    return db.query(CalibrationCharges).all()

@app.get("/additional_calibration_charges/")
def get_calibration_charges(db: Session = Depends(get_db)):
    return db.query(AdditionalCalibrationCharges).all()

app.include_router(quotation.router)
app.include_router(auth.router)
app.include_router(equipments.router)
app.include_router(testing_r1.router)



# uvicorn main:app --host 192.168.107.45 --port 8000 --reload


