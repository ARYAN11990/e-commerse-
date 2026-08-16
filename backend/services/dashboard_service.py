from repositories.dashboard_repository import DashboardRepository

class DashboardService:
    def __init__(self, repository: DashboardRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
