from fastapi import APIRouter, Depends
from dependencies import get_crm_service
from services.crm_service import CrmService

router = APIRouter(prefix="/crm", tags=["crm"])

@router.get("/kpis")
def get_kpis(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["kpis"]

@router.get("/statistics")
def get_statistics(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["statistics"]

@router.get("/estimated-revenue")
def get_estimated_revenue(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["estimated_revenue"]

@router.get("/sales-category")
def get_sales_category(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["sales_category"]

@router.get("/upcoming-schedule")
def get_upcoming_schedule(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["upcoming_schedule"]

@router.get("/recent-orders")
def get_recent_orders(service: CrmService = Depends(get_crm_service)):
    return service.get_all_data()["recent_orders"]
