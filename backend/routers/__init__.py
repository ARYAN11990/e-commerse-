from fastapi import APIRouter, Depends
from dependencies import get___init___service
from services.__init___service import __init__Service

router = APIRouter(prefix="/__init__", tags=["__init__"])
