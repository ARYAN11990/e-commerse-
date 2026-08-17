from typing import List, Optional
from fastapi import HTTPException, status
from providers.auth_provider import AuthMockProvider, UserInDB
from schemas.user import UserCreate, UserUpdate
from utils.security import get_password_hash

class UserService:
    def __init__(self, provider: AuthMockProvider):
        self.provider = provider

    def get_users(self) -> List[UserInDB]:
        return list(self.provider.users_db.values())

    def get_user(self, user_id: str) -> UserInDB:
        user = self.provider.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def create_user(self, user_data: UserCreate) -> UserInDB:
        if self.provider.get_user(user_data.username):
            raise HTTPException(status_code=409, detail="Username already exists")
        if self.provider.get_user_by_email(user_data.email):
            raise HTTPException(status_code=409, detail="Email already exists")
        
        hashed_password = get_password_hash(user_data.password)
        return self.provider.create_user(
            username=user_data.username,
            email=user_data.email,
            hashed_password=hashed_password,
            full_name=user_data.full_name,
            role=user_data.role,
            status=user_data.status
        )

    def update_user(self, user_id: str, user_data: UserUpdate) -> UserInDB:
        user = self.get_user(user_id)
        
        if user_data.username is not None and user_data.username != user.username:
            if self.provider.get_user(user_data.username):
                raise HTTPException(status_code=409, detail="Username already exists")
            user.username = user_data.username
            
        if user_data.email is not None and user_data.email != user.email:
            if self.provider.get_user_by_email(user_data.email):
                raise HTTPException(status_code=409, detail="Email already exists")
            user.email = user_data.email
            
        if user_data.full_name is not None:
            user.full_name = user_data.full_name
        if user_data.role is not None:
            user.role = user_data.role
        if user_data.status is not None:
            user.status = user_data.status
            
        return self.provider.update_user(user_id, user)

    def delete_user(self, user_id: str):
        user = self.get_user(user_id)
        # Protect admin deletion logic (basic implementation)
        if user.role == "Admin" and user.username == "admin":
            raise HTTPException(status_code=403, detail="Cannot delete the primary admin account")
        self.provider.delete_user(user_id)
