from repositories.finance_repository import FinanceRepository

class FinanceService:
    def __init__(self, repository: FinanceRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
