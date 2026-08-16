from repositories.base import BaseRepository

class CrmRepository(BaseRepository):
    def get_data(self):
        return self.provider.get_crm_data()
