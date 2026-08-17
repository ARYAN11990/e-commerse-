# TailAdmin React & FastAPI Dashboard

A full-stack, API-driven dashboard built with a decoupled architecture.
This project uses **React + Vite** for the frontend and **FastAPI** for the backend, communicating through an orchestrated Service/Repository layer currently powered by dynamic Mock data.

---

## 1. Prerequisites

To run this project on Windows, ensure you have the following installed:
- **Python 3.9+** (Ensure `python` is added to your PATH)
- **Node.js 18+** (Includes `npm`)
- **Git** (for version control)
- **PostgreSQL** (Only required *if* you plan to migrate from Mock Data to the Database Provider)

---

## 2. Clone Repository

Open your terminal (PowerShell recommended) and run:
```powershell
git clone <your-repository-url>
cd ecommers
```

---

## 3. Backend Setup

The backend handles API requests and provides the frontend with strictly typed JSON responses (validated via Pydantic).

### 3.1. Python Virtual Environment

Create and activate a virtual environment to isolate Python dependencies.
Open a new PowerShell window and run:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```
*(Note: If you receive an Execution Policy error on Windows, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned` before activating.)*

### 3.2. Install Requirements

With the virtual environment activated, install the FastAPI dependencies:
```powershell
pip install -r requirements.txt
```

### 3.3. Environment Variables

The project uses `.env` files for configuration. A safe `.env.example` file is included in the root directory.
**Never commit real credentials to GitHub.**

1. Copy `.env.example` to the root folder as `.env`:
```powershell
# At the root directory:
cp .env.example .env
```
2. Update the `.env` file if necessary. The defaults usually work for local development.

### 3.4. PostgreSQL / Database Setup (Future)

Currently, the application relies on a `MockProvider` because real client data hasn't been finalized.
When you are ready to transition to real data:
1. Update `DATABASE_URL` in your `.env` file (e.g. `postgresql+psycopg2://user:password@localhost/dbname`).
2. Implement the queries inside `backend/providers/database_provider.py`.
3. Update `backend/dependencies.py` to inject `DatabaseProvider` instead of `MockProvider`.

### 3.5. Alembic Migrations

The core SQLAlchemy models are ready in `backend/models/core.py`.
If you are connected to a real PostgreSQL database, generate and run your migrations:
```powershell
# Inside the backend folder with venv activated:
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```
*(Skip this step if you are currently using the MockProvider.)*

### 3.6. Start FastAPI

To start the backend server in development mode with live reloading:
```powershell
# Inside the backend folder with venv activated:
uvicorn main:app --reload
```
The API will start at: `http://localhost:8000`

### 3.7. API Documentation URL

FastAPI automatically generates interactive API documentation. While the server is running, visit:
- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 4. Frontend Setup

The frontend is a React application bundled by Vite.

### 4.1. Install Dependencies

Open a **new** PowerShell window (keep the FastAPI server running in the other window):
```powershell
cd frontend
npm install
```

### 4.2. Start React / Vite

To start the frontend development server:
```powershell
npm run dev
```
The React dashboard will start at: `http://localhost:5173`

---

## 5. Project Structure

```text
ecommers/
├── .env.example          # Template for environment variables
├── .gitignore            # Git exclusions (blocks .env, venv, node_modules)
├── README.md             # This file
├── frontend/             # React + Vite Frontend
│   ├── src/
│   │   ├── components/   # UI Dashboard Components
│   │   ├── pages/        # Dashboard Views
│   │   └── services/     # Centralized api.js communicating with FastAPI
│   └── package.json
└── backend/              # FastAPI Backend
    ├── main.py           # Application entrypoint & CORS config
    ├── dependencies.py   # Dependency injection (Mock vs Database)
    ├── routers/          # API Route Definitions (Dashboard, CRM, Sales, etc.)
    ├── schemas/          # Strict Pydantic Models for API Responses
    ├── services/         # Business Logic Layer
    ├── repositories/     # Data Access Layer Interface
    ├── providers/        # Data Implementations (MockProvider / DatabaseProvider)
    ├── models/           # SQLAlchemy ORM Models
    └── migrations/       # Alembic Database Migrations
```

---

## 6. Important Notes on Secrets & Version Control

- **Security First:** The `.gitignore` at the root of the project explicitly excludes `node_modules`, `venv/`, `__pycache__`, build output folders, and all `.env` files.
- **NEVER** force-add or commit `.env` files. Keep your database URLs, API keys, and secret tokens safely local on your machine or configured securely on your production deployment environment.
- If a `.env` file was accidentally committed in the past, consider the secrets compromised and rotate them immediately.
