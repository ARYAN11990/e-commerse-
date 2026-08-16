from repositories.logistics_repository import LogisticsRepository

class LogisticsService:
    def __init__(self, repository: LogisticsRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
