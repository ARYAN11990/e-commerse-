from fastapi import APIRouter, Depends
from dependencies import get_finance_service
from services.finance_service import FinanceService

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/balance")
def get_balance(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["balance"]

@router.get("/metrics")
def get_metrics(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["metrics"]

@router.get("/cashflow")
def get_cashflow(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["cashflow"]

@router.get("/cards")
def get_cards(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["cards"]

@router.get("/spending")
def get_spending(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["spending"]

@router.get("/quicksend")
def get_quicksend(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["quicksend"]

@router.get("/transaction-list")
def get_transaction_list(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["transaction_list"]

@router.get("/recent-transactions")
def get_recent_transactions(service: FinanceService = Depends(get_finance_service)):
    return service.get_all_data()["recent_transactions"]
