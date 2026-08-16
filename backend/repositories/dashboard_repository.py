from repositories.base import BaseRepository

class DashboardRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_dashboard_data()
