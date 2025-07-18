from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from orm_models.models import Equipment
from Database.db import get_db  # This should return a Session instance
from pydantic import BaseModel

router = APIRouter(prefix="/equipments", tags=["Equipments"])

# Pydantic schemas
class EquipmentBase(BaseModel):
    name: str
    description: str

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(EquipmentBase):
    pass

class EquipmentResponse(EquipmentBase):
    id: int

    class Config:
        orm_mode = True


# POST: Create equipment
@router.post("/", response_model=EquipmentResponse)
def create_equipment(equipment: EquipmentCreate, db: Session = Depends(get_db)):
    new_equipment = Equipment(**equipment.dict())
    db.add(new_equipment)
    db.commit()
    db.refresh(new_equipment)
    return new_equipment


# GET: Get all equipments
@router.get("/", response_model=List[EquipmentResponse])
def get_all_equipments(db: Session = Depends(get_db)):
    return db.query(Equipment).all()


# PUT: Update equipment by ID
@router.put("/{equipment_id}", response_model=EquipmentResponse)
def update_equipment(equipment_id: int, updated_data: EquipmentUpdate, db: Session = Depends(get_db)):
    equipment = db.query(Equipment).filter(Equipment.id == equipment_id).first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")

    for key, value in updated_data.dict().items():
        setattr(equipment, key, value)

    db.commit()
    db.refresh(equipment)
    return equipment
