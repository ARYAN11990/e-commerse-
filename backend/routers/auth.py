from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from dependencies import get_auth_service, get_current_active_user
from services.auth_service import AuthService
from utils.security import create_access_token, Token, ACCESS_TOKEN_EXPIRE_MINUTES
from pydantic import BaseModel
from providers.auth_provider import UserInDB

router = APIRouter(prefix="/auth", tags=["auth"])

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    full_name: str = None

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service)
):
    user = auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register")
async def register(
    user_in: UserCreate,
    auth_service: AuthService = Depends(get_auth_service)
):
    user = auth_service.register_user(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password,
        full_name=user_in.full_name
    )
    return {"status": "success", "message": "User registered successfully", "username": user.username}

@router.get("/me")
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role
    }

@router.post("/logout")
def logout():
    # Since JWTs are stateless, we just tell the client to drop the token.
    # In a real app with blacklisting, we'd add the token to a blacklist here.
    return {"status": "success", "message": "Logged out successfully."}

class VerifyEmailRequest(BaseModel):
    token: str

@router.post("/verify-email")
def verify_email(req: VerifyEmailRequest):
    if req.token == "invalid":
        raise HTTPException(status_code=400, detail="Invalid token")
    # Mock success
    return {"status": "success", "message": "Email verified successfully."}
