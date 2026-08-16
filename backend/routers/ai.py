from fastapi import APIRouter, Depends
from dependencies import get_ai_service
from services.ai_service import AiService

router = APIRouter(prefix="/ai", tags=["ai"])

@router.get("/kpis")
def get_kpis(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["kpis"]

@router.get("/statistics")
def get_statistics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["statistics"]

@router.get("/token-usages")
def get_token_usages(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["token_usages"]

@router.get("/user-analytics")
def get_user_analytics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["user_analytics"]

@router.get("/projects-analytics")
def get_projects_analytics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["projects_analytics"]

@router.get("/recent-transactions")
def get_recent_transactions(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["recent_transactions"]
