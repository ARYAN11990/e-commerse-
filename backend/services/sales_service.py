from repositories.sales_repository import SalesRepository

class SalesService:
    def __init__(self, repository: SalesRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
