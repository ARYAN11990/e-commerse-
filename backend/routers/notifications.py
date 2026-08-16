from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/notifications", tags=["notifications"])

mock_notifications = [
    {"id": 1, "title": "Edit your information in a swipe", "description": "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.", "date": "12 May, 2025", "read": False},
    {"id": 2, "title": "It is a long established fact", "description": "That a reader will be distracted by the readable.", "date": "24 Feb, 2025", "read": False},
    {"id": 3, "title": "There are many variations", "description": "Of passages of Lorem Ipsum available, but the majority have suffered.", "date": "04 Jan, 2025", "read": True},
    {"id": 4, "title": "There are many variations", "description": "Of passages of Lorem Ipsum available, but the majority have suffered.", "date": "01 Dec, 2024", "read": True},
]

@router.get("/")
def get_notifications():
    return mock_notifications

@router.put("/read/{notif_id}")
def mark_read(notif_id: int):
    for n in mock_notifications:
        if n["id"] == notif_id:
            n["read"] = True
    return {"status": "success"}

@router.put("/read-all")
def mark_all_read():
    for n in mock_notifications:
        n["read"] = True
    return {"status": "success"}
