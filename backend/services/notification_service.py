from repositories.notification_repository import NotificationRepository

class NotificationService:
    def __init__(self, repository: NotificationRepository):
        self.repository = repository
        
    def get_notifications(self):
        return self.repository.get_notifications()

    def mark_notification_read(self, notif_id: int):
        self.repository.mark_notification_read(notif_id)

    def mark_all_notifications_read(self):
        self.repository.mark_all_notifications_read()
