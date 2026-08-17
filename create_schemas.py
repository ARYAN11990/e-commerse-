import os

schemas_dir = 'c:/Users/SIS/Desktop/ecommers/backend/schemas'

common_code = """from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Any, Union

class KpiMetric(BaseModel):
    value: Union[str, int, float]
    rate: Optional[Union[str, float]] = None
    trend: Optional[str] = None
    period: Optional[str] = None
    label: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    change: Optional[Union[str, float]] = None
    comparison: Optional[str] = None
    id: Optional[int] = None

class ChartSeries(BaseModel):
    name: str
    data: List[Union[int, float]]

class ChartData(BaseModel):
    categories: Optional[List[str]] = None
    labels: Optional[List[str]] = None
    series: List[Union[ChartSeries, int, float]]
"""

with open(os.path.join(schemas_dir, 'common.py'), 'w') as f:
    f.write(common_code)

dashboard_code = """from pydantic import BaseModel, ConfigDict
from typing import List, Any, Dict, Union, Optional
from schemas.common import KpiMetric, ChartData

class MonthlyTarget(BaseModel):
    percentage: int
    target: str
    target_trend: str
    revenue: str
    revenue_trend: str
    today: str
    today_trend: str

class RecentOrder(BaseModel):
    id: Union[int, str]
    productName: str
    variants: str
    image: str
    category: str
    price: str
    status: str

class DashboardState(BaseModel):
    kpis: Dict[str, KpiMetric]
    monthly_sales: ChartData
    monthly_target: MonthlyTarget
    statistics: ChartData
    recent_orders: List[RecentOrder]
"""

with open(os.path.join(schemas_dir, 'dashboard.py'), 'w') as f:
    f.write(dashboard_code)

analytics_code = """from pydantic import BaseModel, ConfigDict
from typing import List, Any, Dict, Union, Optional
from schemas.common import KpiMetric, ChartData

class AnalyticsTopChannel(BaseModel):
    id: int
    source: str
    visitors: str

class AnalyticsTopPage(BaseModel):
    id: int
    source: str
    pageviews: str

class AnalyticsActiveUsers(BaseModel):
    live: int
    avg_daily: str
    avg_weekly: str
    avg_monthly: str
    categories: List[str]
    series: List[int]

class AnalyticsRecentOrder(BaseModel):
    id: Union[int, str]
    product: str
    category: str
    country: str
    cr: str
    value: str

class AnalyticsState(BaseModel):
    kpis: Dict[str, KpiMetric]
    visitor_analytics: ChartData
    top_channels: List[AnalyticsTopChannel]
    top_pages: List[AnalyticsTopPage]
    active_users: AnalyticsActiveUsers
    acquisition_channels: ChartData
    sessions_by_device: ChartData
    recent_orders: List[AnalyticsRecentOrder]
"""

with open(os.path.join(schemas_dir, 'analytics.py'), 'w') as f:
    f.write(analytics_code)

generic_code = """from pydantic import BaseModel, ConfigDict
from typing import List, Any, Dict, Union, Optional
from schemas.common import KpiMetric, ChartData

# A fallback generic state mapping for routers that just need structural validation
# We will use Any/Dict for now to allow FastAPI to pass it, but require it to be a dict
class GenericResponse(BaseModel):
    model_config = ConfigDict(extra='allow')
"""

for domain in ['marketing', 'crm', 'stocks', 'saas', 'logistics', 'ai', 'sales', 'finance']:
    with open(os.path.join(schemas_dir, f"{domain}.py"), 'w') as f:
        f.write(generic_code)

with open(os.path.join(schemas_dir, '__init__.py'), 'w') as f:
    f.write("")
