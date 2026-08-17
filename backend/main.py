import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from routers import dashboard, analytics, marketing, crm, stocks, saas, logistics, ai, sales, finance, profile, auth, notifications, users, ecommerce

app = FastAPI(title="TailAdmin Dashboard API")

# Allow CORS configured via environment variables and explicit defaults
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "")
env_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

# Combine explicit defaults with any origins from the environment variable
allowed_origins = list(set([
    "http://localhost:5173",
    "https://tailadmin1.vercel.app"
] + env_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Session-ID", "Accept", "Origin", "X-Requested-With"],
)

from utils.mock_data import session_id_var

@app.middleware("http")
async def session_id_middleware(request: Request, call_next):
    session_id = request.headers.get("X-Session-ID", "default-session")
    token = session_id_var.set(session_id)
    try:
        response = await call_next(request)
        return response
    finally:
        session_id_var.reset(token)

# Global Exception Handlers for consistent API errors
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": "Validation error", "errors": exc.errors()}
    )

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    # Do not leak database internals
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal database error occurred"}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred"}
    )

app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(analytics.router, prefix="/api/v1")
app.include_router(marketing.router, prefix="/api/v1")
app.include_router(crm.router, prefix="/api/v1")
app.include_router(stocks.router, prefix="/api/v1")
app.include_router(saas.router, prefix="/api/v1")
app.include_router(logistics.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")
app.include_router(sales.router, prefix="/api/v1")
app.include_router(finance.router, prefix="/api/v1")
app.include_router(profile.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(notifications.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(ecommerce.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to TailAdmin Clone API"}
