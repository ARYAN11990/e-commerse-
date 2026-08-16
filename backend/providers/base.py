from abc import ABC, abstractmethod
from typing import Any, Dict

class BaseProvider(ABC):
    
    @abstractmethod
    def get_dashboard_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_analytics_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_marketing_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_crm_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_stocks_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_saas_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_logistics_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_ai_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_sales_data(self) -> Dict[str, Any]:
        pass

    @abstractmethod
    def get_finance_data(self) -> Dict[str, Any]:
        pass
