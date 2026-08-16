from fastapi import APIRouter, Depends
from dependencies import get_marketing_service
from services.marketing_service import MarketingService

router = APIRouter(prefix="/marketing", tags=["marketing"])

@router.get("/kpis")
def get_kpis(service: MarketingService = Depends(get_marketing_service)):
    return service.get_all_data()["kpis"]

@router.get("/impression-traffic")
def get_impression_traffic(service: MarketingService = Depends(get_marketing_service)):
    return service.get_all_data()["impression_traffic"]

@router.get("/traffic-stats")
def get_traffic_stats(service: MarketingService = Depends(get_marketing_service)):
    return service.get_all_data()["traffic_stats"]

@router.get("/featured-campaigns")
def get_featured_campaigns(service: MarketingService = Depends(get_marketing_service)):
    return service.get_all_data()["featured_campaigns"]

@router.get("/top-traffic-source")
def get_top_traffic_source(service: MarketingService = Depends(get_marketing_service)):
    return service.get_all_data()["top_traffic_source"]
