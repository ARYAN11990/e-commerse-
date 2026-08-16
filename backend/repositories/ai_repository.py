from repositories.base import BaseRepository

class AiRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_ai_data()
