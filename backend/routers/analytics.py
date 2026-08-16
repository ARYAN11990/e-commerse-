from fastapi import APIRouter, Depends
from dependencies import get_analytics_service
from services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/kpis")
def get_kpis(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["kpis"]

@router.get("/visitor-analytics")
def get_visitor_analytics(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["visitor_analytics"]

@router.get("/top-channels")
def get_top_channels(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["top_channels"]

@router.get("/top-pages")
def get_top_pages(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["top_pages"]

@router.get("/active-users")
def get_active_users(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["active_users"]

@router.get("/acquisition-channels")
def get_acquisition_channels(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["acquisition_channels"]

@router.get("/sessions-by-device")
def get_sessions_by_device(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["sessions_by_device"]

@router.get("/recent-orders")
def get_recent_orders(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["recent_orders"]
