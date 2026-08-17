from schemas.saas import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_saas_service
from services.saas_service import SaasService

router = APIRouter(prefix="/saas", tags=["saas"])

@router.get("/overview", response_model=Overview)
def get_overview(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["overview"]

@router.get("/churn-rate", response_model=ChurnRate)
def get_churn_rate(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["churn_rate"]

@router.get("/user-growth", response_model=UserGrowth)
def get_user_growth(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["user_growth"]

@router.get("/product-performance", response_model=ProductPerformance)
def get_product_performance(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["product_performance"]

@router.get("/conversion-funnel", response_model=ConversionFunnel)
def get_conversion_funnel(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["conversion_funnel"]

@router.get("/recent-invoices", response_model=list[RecentInvoice])
def get_recent_invoices(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["recent_invoices"]

@router.get("/activities", response_model=list[Activity])
def get_activities(service: SaasService = Depends(get_saas_service)):
    return service.get_all_data()["activities"]
