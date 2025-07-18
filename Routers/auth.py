from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from Database.db import get_db
from orm_models.models import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    username: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    message: str

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Query the database for the user
    user = db.query(User).filter(User.username == request.username).first()
    
    # Check if user exists and password matches
    if not user or user.password != request.password:
        return LoginResponse(
            success=False,
            message="Invalid username or password"
        )
    
    # If authentication is successful, return user information
    return LoginResponse(
        success=True,
        username=user.username,
        role=user.role,
        department=user.department,
        message="Login successful"
    )