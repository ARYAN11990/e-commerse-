from repositories.base import BaseRepository

class StocksRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_stocks_data()
