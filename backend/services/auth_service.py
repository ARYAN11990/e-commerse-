from typing import Optional
from providers.auth_provider import AuthMockProvider, UserInDB
from utils.security import verify_password, get_password_hash
from fastapi import HTTPException, status

class AuthService:
    def __init__(self, provider: AuthMockProvider = None):
        self.provider = provider or AuthMockProvider()

    def authenticate_user(self, username: str, password: str) -> Optional[UserInDB]:
        user = self.provider.get_user(username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def register_user(self, username: str, email: str, password: str, full_name: Optional[str] = None) -> UserInDB:
        if self.provider.get_user(username):
            raise HTTPException(status_code=400, detail="Username already registered")
        if self.provider.get_user_by_email(email):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(password)
        return self.provider.create_user(username, email, hashed_password, full_name)

    def get_user(self, username: str) -> Optional[UserInDB]:
        return self.provider.get_user(username)
