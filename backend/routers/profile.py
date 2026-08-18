from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import uuid

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
    "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
    "social": {"facebook": "https://facebook.com", "twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "instagram": "https://instagram.com"}
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

db_sessions = [
    {"id": str(uuid.uuid4()), "device": "Chrome", "os": "Windows", "ip": "192.168.1.1", "location": "Ahmedabad, India", "last_active": "Active now", "current": True},
    {"id": str(uuid.uuid4()), "device": "Safari", "os": "iPhone", "ip": "10.0.0.5", "location": "Ahmedabad, India", "last_active": "2 hours ago", "current": False}
]

class SocialLinks(BaseModel):
    facebook: str
    twitter: str
    linkedin: str
    instagram: str

class ProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    bio: str
    job_title: str
    location: str
    social: Optional[SocialLinks] = None

class AddressUpdate(BaseModel):
    country: str
    city_state: str
    postal_code: str
    tax_id: str

class SecurityUpdate(BaseModel):
    two_factor_enabled: bool

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str

@router.get("/")
def get_profile():
    return {
        "profile": db_profile,
        "address": db_address,
        "security": db_security,
        "sessions": db_sessions
    }

@router.put("/")
def update_profile(data: ProfileUpdate):
    update_data = data.dict(exclude_unset=True)
    db_profile.update(update_data)
    return {"status": "success", "profile": db_profile}

@router.post("/avatar")
def update_avatar(data: dict):
    if "avatar" in data:
        db_profile["avatar"] = data["avatar"]
    return {"status": "success", "avatar": db_profile["avatar"]}

@router.put("/address")
def update_address(data: AddressUpdate):
    db_address.update(data.dict())
    return {"status": "success", "address": db_address}

@router.put("/security")
def update_security(data: dict):
    if "two_factor_enabled" in data:
        db_security["two_factor_enabled"] = data["two_factor_enabled"]
    return {"status": "success", "security": db_security}

@router.put("/password")
def update_password(data: PasswordUpdate):
    return {"status": "success", "message": "Password changed successfully."}

@router.delete("/sessions/{session_id}")
def delete_session(session_id: str):
    global db_sessions
    db_sessions = [s for s in db_sessions if s["id"] != session_id]
    return {"status": "success", "sessions": db_sessions}

@router.post("/logout-all")
def logout_all():
    global db_sessions
    db_sessions = [s for s in db_sessions if s["current"]]
    return {"status": "success", "sessions": db_sessions}

@router.delete("/account")
def delete_account():
    return {"status": "success", "message": "Account deleted successfully."}
