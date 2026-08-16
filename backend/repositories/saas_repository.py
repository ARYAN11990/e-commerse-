from repositories.base import BaseRepository

class SaasRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_saas_data()
