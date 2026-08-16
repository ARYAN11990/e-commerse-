from fastapi import APIRouter, Depends
from dependencies import get_sales_service
from services.sales_service import SalesService

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/header")
def get_header(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["header"]

@router.get("/kpis")
def get_kpis(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["kpis"]

@router.get("/statistics")
def get_statistics(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["statistics"]

@router.get("/retention")
def get_retention(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["retention"]

@router.get("/channel")
def get_channel(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["channel"]

@router.get("/country")
def get_country(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["country"]

@router.get("/top-products")
def get_top_products(service: SalesService = Depends(get_sales_service)):
    return service.get_all_data()["top_products"]
