from schemas.analytics import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_analytics_service
from services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/kpis", response_model=Kpis)
def get_kpis(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["kpis"]

@router.get("/visitor-analytics", response_model=VisitorAnalytics)
def get_visitor_analytics(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["visitor_analytics"]

@router.get("/top-channels", response_model=list[TopChannel])
def get_top_channels(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["top_channels"]

@router.get("/top-pages", response_model=list[TopPage])
def get_top_pages(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["top_pages"]

@router.get("/active-users", response_model=ActiveUsers)
def get_active_users(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["active_users"]

@router.get("/acquisition-channels", response_model=AcquisitionChannels)
def get_acquisition_channels(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["acquisition_channels"]

@router.get("/sessions-by-device", response_model=SessionsByDevice)
def get_sessions_by_device(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["sessions_by_device"]

@router.get("/recent-orders", response_model=list[RecentOrder])
def get_recent_orders(service: AnalyticsService = Depends(get_analytics_service)):
    return service.get_all_data()["recent_orders"]
