from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/profile", tags=["profile"])

# In-memory mock data
db_profile = {
    "first_name": "Musharof",
    "last_name": "Chowdhury",
    "job_title": "Team Manager",
    "location": "Arizona, United States.",
    "email": "randomuser@pimjo.com",
    "phone": "+09 363 398 46",
    "bio": "Team Manager",
    "social": {"facebook": "#", "twitter": "#", "linkedin": "#", "instagram": "#"}
}

db_address = {
    "country": "United States",
    "city_state": "Arizona, United States.",
    "postal_code": "ERT 2489",
    "tax_id": "AS4568384"
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
