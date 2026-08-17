from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/profile", tags=["profile"])

# In-memory mock data
db_profile = {
    "first_name": "ARYAN",
    "last_name": "PARMAR",
    "job_title": "Full Stack Developer",
    "location": "Ahmedabad, Gujarat, India",
    "email": "aryanparmar855@gmail.com",
    "phone": "6370977845",
    "bio": "Team Manager",
    "social": {"facebook": "#", "twitter": "#", "linkedin": "#", "instagram": "#"}
}

db_address = {
    "country": "India",
    "city_state": "Ahmedabad, Gujarat",
    "postal_code": "380001",
    "tax_id": "TAX-IND-DEMO-001"
}

db_security = {
    "two_factor_enabled": False
}

class ProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    bio: str
    job_title: str
    location: str

class AddressUpdate(BaseModel):
    country: str
    city_state: str
    postal_code: str
    tax_id: str

class SecurityUpdate(BaseModel):
    two_factor_enabled: bool

@router.get("/")
def get_profile():
    return {
        "profile": db_profile,
        "address": db_address,
        "security": db_security
    }

@router.put("/")
def update_profile(data: ProfileUpdate):
    db_profile.update(data.dict())
    return {"status": "success", "profile": db_profile}

@router.put("/address")
def update_address(data: AddressUpdate):
    db_address.update(data.dict())
    return {"status": "success", "address": db_address}

@router.put("/security")
def update_security(data: dict):
    if "two_factor_enabled" in data:
        db_security["two_factor_enabled"] = data["two_factor_enabled"]
    return {"status": "success", "security": db_security}

@router.delete("/account")
def delete_account():
    # Mock deletion
    return {"status": "success", "message": "Account deleted successfully."}
