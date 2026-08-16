from providers.base import BaseProvider

class BaseRepository:
    def __init__(self, provider: BaseProvider):
        self.provider = provider
