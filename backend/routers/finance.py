from schemas.finance import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_finance_service
from services.finance_service import FinanceService

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/balance", response_model=Balance)
def get_balance(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["balance"]

@router.get("/metrics", response_model=list[Metric])
def get_metrics(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["metrics"]

@router.get("/cashflow", response_model=Cashflow)
def get_cashflow(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["cashflow"]

@router.get("/cards", response_model=Cards)
def get_cards(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["cards"]

@router.get("/spending", response_model=Spending)
def get_spending(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["spending"]

@router.get("/quicksend", response_model=Quicksend)
def get_quicksend(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["quicksend"]

@router.get("/transaction-list", response_model=list[TransactionListItem])
def get_transaction_list(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["transaction_list"]

@router.get("/recent-transactions", response_model=list[RecentTransaction])
def get_recent_transactions(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["recent_transactions"]
