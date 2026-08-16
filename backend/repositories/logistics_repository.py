from repositories.base import BaseRepository

class LogisticsRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_logistics_data()
