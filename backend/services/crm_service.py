from repositories.crm_repository import CrmRepository

class CrmService:
    def __init__(self, repository: CrmRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
