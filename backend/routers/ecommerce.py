from fastapi import APIRouter
from typing import List, Dict

router = APIRouter(prefix="/ecommerce", tags=["Ecommerce"])

@router.get("/products")
async def get_products():
    return [
        {
            "id": 1,
            "name": "ASUS ROG Gaming Laptop",
            "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=150&q=80",
            "category": "Laptop",
            "brand": "ASUS",
            "price": "$2,199",
            "stock": "Out of Stock",
            "created_at": "01 Dec, 2027"
        },
        {
            "id": 2,
            "name": "Airpods Pro 2nd Gen",
            "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=150&q=80",
            "category": "Accessories",
            "brand": "Apple",
            "price": "$839",
            "stock": "In Stock",
            "created_at": "29 Jun, 2027"
        },
        {
            "id": 3,
            "name": "Apple Watch Ultra",
            "image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=150&q=80",
            "category": "Watch",
            "brand": "Apple",
            "price": "$1,579",
            "stock": "Out of Stock",
            "created_at": "13 Mar, 2027"
        },
        {
            "id": 4,
            "name": "Bose QuietComfort Earbuds",
            "image": "https://images.unsplash.com/photo-1546435770-a3e426fa47ce?auto=format&fit=crop&w=150&q=80",
            "category": "Audio",
            "brand": "Bose",
            "price": "$279",
            "stock": "In Stock",
            "created_at": "18 Nov, 2027"
        },
        {
            "id": 5,
            "name": "Canon EOS R5 Camera",
            "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",
            "category": "Camera",
            "brand": "Canon",
            "price": "$3,899",
            "stock": "In Stock",
            "created_at": "28 Sep, 2027"
        }
    ]

@router.get("/invoices")
async def get_invoices():
    return [
        {
            "id": "INV-2027-001",
            "client": "Acme Corp",
            "amount": "$1,450.00",
            "status": "Paid",
            "date": "15 Dec, 2027"
        },
        {
            "id": "INV-2027-002",
            "client": "Global Tech",
            "amount": "$3,200.00",
            "status": "Pending",
            "date": "12 Dec, 2027"
        },
        {
            "id": "INV-2027-003",
            "client": "Wayne Enterprises",
            "amount": "$550.00",
            "status": "Paid",
            "date": "08 Dec, 2027"
        }
    ]

@router.get("/transactions")
async def get_transactions():
    return [
        {
            "id": "TRX-98213",
            "method": "Credit Card",
            "amount": "$1,450.00",
            "status": "Completed",
            "date": "15 Dec, 2027, 14:30"
        },
        {
            "id": "TRX-98214",
            "method": "PayPal",
            "amount": "$3,200.00",
            "status": "Pending",
            "date": "16 Dec, 2027, 09:15"
        }
    ]
