from repositories.marketing_repository import MarketingRepository

class MarketingService:
    def __init__(self, repository: MarketingRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
