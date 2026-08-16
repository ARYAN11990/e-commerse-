from repositories.base import BaseRepository

class FinanceRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_finance_data()
