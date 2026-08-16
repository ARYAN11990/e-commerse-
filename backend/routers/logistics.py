from fastapi import APIRouter, Depends
from dependencies import get_logistics_service
from services.logistics_service import LogisticsService

router = APIRouter(prefix="/logistics", tags=["logistics"])

@router.get("/kpis")
def get_kpis(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["kpis"]

@router.get("/delivery-statistics")
def get_delivery_statistics(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["delivery_statistics"]

@router.get("/tracking")
def get_tracking(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["tracking"]

@router.get("/revenue-earned")
def get_revenue_earned(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["revenue_earned"]

@router.get("/delivery-vehicles")
def get_delivery_vehicles(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["delivery_vehicles"]

@router.get("/activities")
def get_activities(service: LogisticsService = Depends(get_logistics_service)):
    return service.get_all_data()["activities"]
