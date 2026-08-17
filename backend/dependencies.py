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

# --- AUTH DEPENDENCIES ---
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jose import JWTError
from utils.security import SECRET_KEY, ALGORITHM, TokenData
from services.auth_service import AuthService
from providers.auth_provider import AuthMockProvider, UserInDB
from services.user_service import UserService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# Shared single instance
auth_provider_instance = AuthMockProvider()
auth_service_instance = AuthService(auth_provider_instance)
user_service_instance = UserService(auth_provider_instance)

def get_auth_service() -> AuthService:
    return auth_service_instance

def get_user_service() -> UserService:
    return user_service_instance

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
        
    user = auth_service_instance.get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: UserInDB = Depends(get_current_user)):
    if not hasattr(current_user, 'status') or current_user.status != "Active":
        raise HTTPException(status_code=403, detail="Inactive user")
    return current_user

async def require_admin_role(current_user: UserInDB = Depends(get_current_active_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action"
        )
    return current_user

