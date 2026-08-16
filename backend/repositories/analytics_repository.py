from repositories.base import BaseRepository

class AnalyticsRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_analytics_data()
