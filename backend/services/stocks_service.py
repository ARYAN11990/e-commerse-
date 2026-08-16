from repositories.stocks_repository import StocksRepository

class StocksService:
    def __init__(self, repository: StocksRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
