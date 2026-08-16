from repositories.analytics_repository import AnalyticsRepository

class AnalyticsService:
    def __init__(self, repository: AnalyticsRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
