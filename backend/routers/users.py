from typing import List
from fastapi import APIRouter, Depends, status

from schemas.user import UserCreate, UserUpdate, UserResponse
from services.user_service import UserService
from dependencies import get_user_service, require_admin_role
from providers.auth_provider import UserInDB

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_users(
    service: UserService = Depends(get_user_service),
    current_user: UserInDB = Depends(require_admin_role)
):
    return service.get_users()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    service: UserService = Depends(get_user_service),
    current_user: UserInDB = Depends(require_admin_role)
):
    return service.get_user(user_id)

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    user_data: UserCreate,
    service: UserService = Depends(get_user_service),
    current_user: UserInDB = Depends(require_admin_role)
):
    return service.create_user(user_data)

@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    user_data: UserUpdate,
    service: UserService = Depends(get_user_service),
    current_user: UserInDB = Depends(require_admin_role)
):
    return service.update_user(user_id, user_data)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: str,
    service: UserService = Depends(get_user_service),
    current_user: UserInDB = Depends(require_admin_role)
):
    service.delete_user(user_id)
