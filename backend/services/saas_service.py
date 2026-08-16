from repositories.saas_repository import SaasRepository

class SaasService:
    def __init__(self, repository: SaasRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
