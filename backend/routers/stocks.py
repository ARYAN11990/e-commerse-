from fastapi import APIRouter, Depends
from dependencies import get_stocks_service
from services.stocks_service import StocksService

router = APIRouter(prefix="/stocks", tags=["stocks"])

@router.get("/overview")
def get_stock_overview(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["overview"]

@router.get("/portfolio-performance")
def get_portfolio_performance(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["portfolio_performance"]

@router.get("/dividend")
def get_dividend(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["dividend"]

@router.get("/watchlist")
def get_watchlist(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["watchlist"]

@router.get("/trending-stocks")
def get_trending_stocks(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["trending_stocks"]

@router.get("/latest-transactions")
def get_latest_transactions(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["latest_transactions"]
