from fastapi import APIRouter, Depends
from dependencies import get_dashboard_service
from services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/kpis")
def get_kpis(service: DashboardService = Depends(get_dashboard_service)):
    return service.get_all_data()["kpis"]

@router.get("/monthly-sales")
def get_monthly_sales(service: DashboardService = Depends(get_dashboard_service)):
    return service.get_all_data()["monthly_sales"]

@router.get("/monthly-target")
def get_monthly_target(service: DashboardService = Depends(get_dashboard_service)):
    return service.get_all_data()["monthly_target"]

@router.get("/statistics")
def get_statistics(service: DashboardService = Depends(get_dashboard_service)):
    return service.get_all_data()["statistics"]

@router.get("/recent-orders")
def get_recent_orders(service: DashboardService = Depends(get_dashboard_service)):
    return service.get_all_data()["recent_orders"]
