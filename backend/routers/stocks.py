from schemas.stocks import *
from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from dependencies import get_stocks_service
from services.stocks_service import StocksService

router = APIRouter(prefix="/stocks", tags=["stocks"])

@router.get("/overview", response_model=list[OverviewItem])
def get_stock_overview(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["overview"]

@router.get("/portfolio-performance", response_model=PortfolioPerformance)
def get_portfolio_performance(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["portfolio_performance"]

@router.get("/dividend", response_model=Dividend)
def get_dividend(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["dividend"]

@router.get("/watchlist", response_model=list[WatchlistItem])
def get_watchlist(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["watchlist"]

@router.get("/trending-stocks", response_model=list[TrendingStock])
def get_trending_stocks(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["trending_stocks"]

@router.get("/latest-transactions", response_model=list[LatestTransaction])
def get_latest_transactions(service: StocksService = Depends(get_stocks_service)):
    return service.get_all_data()["latest_transactions"]
