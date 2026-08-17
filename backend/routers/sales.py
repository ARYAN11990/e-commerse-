from schemas.sales import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_sales_service
from services.sales_service import SalesService

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/header", response_model=Header)
def get_header(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["header"]

@router.get("/kpis", response_model=list[Kpi])
def get_kpis(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["kpis"]

@router.get("/statistics", response_model=Statistics)
def get_statistics(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["statistics"]

@router.get("/retention", response_model=Retention)
def get_retention(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["retention"]

@router.get("/channel", response_model=Channel)
def get_channel(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["channel"]

@router.get("/country", response_model=Country)
def get_country(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["country"]

@router.get("/top-products", response_model=list[TopProduct])
def get_top_products(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["top_products"]
