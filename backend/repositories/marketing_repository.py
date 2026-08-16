from repositories.base import BaseRepository

class MarketingRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_marketing_data()
