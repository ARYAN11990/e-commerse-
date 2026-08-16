from repositories.ai_repository import AiRepository

class AiService:
    def __init__(self, repository: AiRepository):
        self.repository = repository
        
    def get_all_data(self):
        return self.repository.get_data()
