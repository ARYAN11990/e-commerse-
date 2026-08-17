from providers.base import BaseProvider

class NotificationRepository:
    def __init__(self, provider: BaseProvider):
        self.provider = provider
        
    def get_notifications(self):
        if hasattr(self.provider, "get_notifications"):
            return self.provider.get_notifications()
        return []

    def mark_notification_read(self, notif_id: int):
        if hasattr(self.provider, "mark_notification_read"):
            self.provider.mark_notification_read(notif_id)

    def mark_all_notifications_read(self):
        if hasattr(self.provider, "mark_all_notifications_read"):
            self.provider.mark_all_notifications_read()
