from repositories.base import BaseRepository

class SalesRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_sales_data()
