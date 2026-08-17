from fastapi import APIRouter, Depends, Header
from typing import Optional
from providers.mock_provider import MockProvider
from repositories.notification_repository import NotificationRepository
from services.notification_service import NotificationService
from utils.mock_data import session_id_var

router = APIRouter(prefix="/notifications", tags=["notifications"])

def get_notification_service(x_session_id: Optional[str] = Header(None)) -> NotificationService:
    if x_session_id:
        session_id_var.set(x_session_id)
    provider = MockProvider()
    repository = NotificationRepository(provider)
    return NotificationService(repository)

@router.get("/")
def get_notifications(service: NotificationService = Depends(get_notification_service)):
    return service.get_notifications()

@router.put("/read/{notif_id}")
def mark_read(notif_id: int, service: NotificationService = Depends(get_notification_service)):
    service.mark_notification_read(notif_id)
    return {"status": "success"}

@router.put("/read-all")
def mark_all_read(service: NotificationService = Depends(get_notification_service)):
    service.mark_all_notifications_read()
    return {"status": "success"}
