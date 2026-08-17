from typing import Optional
from utils.security import get_password_hash
from pydantic import BaseModel
import uuid

class UserInDB(BaseModel):
    id: str
    username: str
    email: str
    hashed_password: str
    full_name: Optional[str] = None
    role: str = "Customer" # Admin, Manager, Employee, Customer
    status: str = "Active" # Active, Inactive

class AuthMockProvider:
    def __init__(self):
        # Temporary in-memory user database to avoid connecting to Postgres for Auth yet.
        admin_id = str(uuid.uuid4())
        manager_id = str(uuid.uuid4())
        employee_id = str(uuid.uuid4())
        customer1_id = str(uuid.uuid4())
        customer2_id = str(uuid.uuid4())
        
        self.users_db = {
            admin_id: UserInDB(
                id=admin_id,
                username="ARYAN PARMAR",
                email="aryanparmar855@gmail.com",
                hashed_password=get_password_hash("admin123"),
                full_name="ARYAN PARMAR",
                role="Full Stack Developer",
                status="Active"
            ),
            manager_id: UserInDB(
                id=manager_id,
                username="manager",
                email="manager@example.com",
                hashed_password=get_password_hash("manager123"),
                full_name="Manager User",
                role="Manager",
                status="Active"
            ),
            employee_id: UserInDB(
                id=employee_id,
                username="employee",
                email="employee@example.com",
                hashed_password=get_password_hash("employee123"),
                full_name="Employee User",
                role="Employee",
                status="Active"
            ),
            customer1_id: UserInDB(
                id=customer1_id,
                username="customer1",
                email="customer1@example.com",
                hashed_password=get_password_hash("customer123"),
                full_name="Alice Smith",
                role="Customer",
                status="Active"
            ),
            customer2_id: UserInDB(
                id=customer2_id,
                username="customer2",
                email="customer2@example.com",
                hashed_password=get_password_hash("customer123"),
                full_name="Bob Jones",
                role="Customer",
                status="Inactive"
            )
        }

    def get_user_by_id(self, user_id: str) -> Optional[UserInDB]:
        return self.users_db.get(user_id)

    def get_user(self, username: str) -> Optional[UserInDB]:
        for user in self.users_db.values():
            if user.username == username:
                return user
        return None
    
    def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        for user in self.users_db.values():
            if user.email == email:
                return user
        return None

    def create_user(self, username: str, email: str, hashed_password: str, full_name: Optional[str] = None, role: str = "Customer", status: str = "Active") -> UserInDB:
        new_id = str(uuid.uuid4())
        new_user = UserInDB(id=new_id, username=username, email=email, hashed_password=hashed_password, full_name=full_name, role=role, status=status)
        self.users_db[new_id] = new_user
        return new_user

    def update_user(self, user_id: str, updated_user: UserInDB) -> UserInDB:
        self.users_db[user_id] = updated_user
        return updated_user

    def delete_user(self, user_id: str):
        if user_id in self.users_db:
            del self.users_db[user_id]

