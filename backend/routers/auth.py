from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/logout")
def logout():
    return {"status": "success", "message": "Logged out successfully."}

@router.post("/logout-all")
def logout_all():
    return {"status": "success", "message": "Logged out from all devices."}
