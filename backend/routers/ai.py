from schemas.ai import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_ai_service
from services.ai_service import AiService

router = APIRouter(prefix="/ai", tags=["ai"])

@router.get("/kpis", response_model=list[Kpi])
def get_kpis(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["kpis"]

@router.get("/statistics", response_model=Statistics)
def get_statistics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["statistics"]

@router.get("/token-usages", response_model=TokenUsages)
def get_token_usages(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["token_usages"]

@router.get("/user-analytics", response_model=UserAnalytics)
def get_user_analytics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["user_analytics"]

@router.get("/projects-analytics", response_model=ProjectsAnalytics)
def get_projects_analytics(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["projects_analytics"]

@router.get("/recent-transactions", response_model=list[RecentTransaction])
def get_recent_transactions(service: AiService = Depends(get_ai_service)):
    return service.get_all_data()["recent_transactions"]
