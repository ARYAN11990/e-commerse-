from providers.mock_provider import MockProvider

# Repositories
from repositories.dashboard_repository import DashboardRepository
from repositories.analytics_repository import AnalyticsRepository
from repositories.marketing_repository import MarketingRepository
from repositories.crm_repository import CrmRepository
from repositories.stocks_repository import StocksRepository
from repositories.saas_repository import SaasRepository
from repositories.logistics_repository import LogisticsRepository
from repositories.ai_repository import AiRepository
from repositories.sales_repository import SalesRepository
from repositories.finance_repository import FinanceRepository

# Services
from services.dashboard_service import DashboardService
from services.analytics_service import AnalyticsService
from services.marketing_service import MarketingService
from services.crm_service import CrmService
from services.stocks_service import StocksService
from services.saas_service import SaasService
from services.logistics_service import LogisticsService
from services.ai_service import AiService
from services.sales_service import SalesService
from services.finance_service import FinanceService

# We use a singleton MockProvider for now. 
# Later, we can conditionally return DatabaseProvider based on env.
_provider = MockProvider()

def get_dashboard_service() -> DashboardService:
    repo = DashboardRepository(_provider)
    return DashboardService(repo)

def get_analytics_service() -> AnalyticsService:
    repo = AnalyticsRepository(_provider)
    return AnalyticsService(repo)

def get_marketing_service() -> MarketingService:
    repo = MarketingRepository(_provider)
    return MarketingService(repo)

def get_crm_service() -> CrmService:
    repo = CrmRepository(_provider)
    return CrmService(repo)

def get_stocks_service() -> StocksService:
    repo = StocksRepository(_provider)
    return StocksService(repo)

def get_saas_service() -> SaasService:
    repo = SaasRepository(_provider)
    return SaasService(repo)

def get_logistics_service() -> LogisticsService:
    repo = LogisticsRepository(_provider)
    return LogisticsService(repo)

def get_ai_service() -> AiService:
    repo = AiRepository(_provider)
    return AiService(repo)

def get_sales_service() -> SalesService:
    repo = SalesRepository(_provider)
    return SalesService(repo)

def get_finance_service() -> FinanceService:
    repo = FinanceRepository(_provider)
    return FinanceService(repo)
