from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dashboard, analytics, marketing, crm, stocks, saas, logistics, ai, sales, finance, profile, auth, notifications

app = FastAPI(title="TailAdmin Dashboard API")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.get("/")
def read_root():
    return {"message": "Welcome to TailAdmin Clone API"}
