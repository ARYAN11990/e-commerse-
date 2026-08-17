from schemas.logistics import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_logistics_service
from services.logistics_service import LogisticsService

router = APIRouter(prefix="/logistics", tags=["logistics"])

@router.get("/kpis", response_model=list[Kpi])
def get_kpis(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["kpis"]

@router.get("/delivery-statistics", response_model=DeliveryStatistics)
def get_delivery_statistics(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["delivery_statistics"]

@router.get("/tracking", response_model=Tracking)
def get_tracking(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["tracking"]

@router.get("/revenue-earned", response_model=RevenueEarned)
def get_revenue_earned(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["revenue_earned"]

@router.get("/delivery-vehicles", response_model=DeliveryVehicles)
def get_delivery_vehicles(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["delivery_vehicles"]

@router.get("/activities", response_model=list[Activity])
def get_activities(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["activities"]
