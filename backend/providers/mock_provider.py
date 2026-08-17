from typing import Any, Dict
from providers.base import BaseProvider
from utils.mock_data import get_dashboard_state
import providers.mock_generators as mg

class MockProvider(BaseProvider):

    def get_dashboard_data(self) -> Dict[str, Any]:
        return get_dashboard_state("ecommerce", mg.generate_ecommerce_state)

    def get_analytics_data(self) -> Dict[str, Any]:
        return get_dashboard_state("analytics", mg.generate_analytics_state)

    def get_marketing_data(self) -> Dict[str, Any]:
        return get_dashboard_state("marketing", mg.generate_marketing_state)

    def get_crm_data(self) -> Dict[str, Any]:
        return get_dashboard_state("crm", mg.generate_crm_state)

    def get_stocks_data(self) -> Dict[str, Any]:
        return get_dashboard_state("stocks", mg.generate_stocks_state)

    def get_saas_data(self) -> Dict[str, Any]:
        return get_dashboard_state("saas", mg.generate_saas_state)

    def get_logistics_data(self) -> Dict[str, Any]:
        return get_dashboard_state("logistics", mg.generate_logistics_state)

    def get_ai_data(self) -> Dict[str, Any]:
        return get_dashboard_state("ai", mg.generate_ai_state)

    def get_sales_data(self) -> Dict[str, Any]:
        return get_dashboard_state("sales", mg.generate_sales_state)

    def get_finance_data(self) -> Dict[str, Any]:
        return get_dashboard_state("finance", mg.generate_finance_state)

    def get_notifications(self) -> list:
        return get_dashboard_state("notifications", mg.generate_notifications_state)

    def mark_notification_read(self, notif_id: int):
        notifs = self.get_notifications()
        for n in notifs:
            if n["id"] == notif_id:
                n["read"] = True

    def mark_all_notifications_read(self):
        notifs = self.get_notifications()
        for n in notifs:
            n["read"] = True
