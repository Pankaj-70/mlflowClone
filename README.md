# 🧠 MLflow-Clone Dashboard
✅ **This README includes:**
- Overview + features  
- Full tech stack  
- Setup + usage  
- Example flow  
- Optional deployment steps  



A **full-stack ML experiment tracking web app** inspired by [MLflow](https://mlflow.org/).  
Track experiments, runs, parameters, metrics, and artifacts — all locally with a clean React + FastAPI interface.

---


## 🚀 Features

✅ Create and manage experiments  
✅ Start and finish runs  
✅ Log parameters and metrics  
✅ Visualize metrics in line charts (Recharts)  
✅ Upload and list artifacts for each run  
✅ Built entirely with **free, open-source** tools  
✅ Works locally — no paid dependencies required  

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React + Vite + TypeScript | Interactive dashboard |
|  | Tailwind CSS | Fast and responsive styling |
|  | Recharts | Metrics visualization |
|  | Axios | API communication |
| **Backend** | FastAPI | REST API server |
|  | SQLAlchemy | ORM for database models |
|  | SQLite | Local database |
|  | Pydantic | Request/response validation |
|  | Uvicorn | ASGI server |
| **Storage** | Local filesystem (`/storage/artifacts`) | Artifact storage (e.g., model files, logs) |

---

## ⚙️ Folder Structure

mlflow-clone/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── database.py
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── crud.py
│ │ ├── deps.py
│ │ └── routers/
│ │ ├── experiments.py
│ │ ├── runs.py
│ │ ├── metrics.py
│ │ ├── params.py
│ │ └── artifacts.py
│ └── storage/
│ └── artifacts/
└── frontend/
├── src/
│ ├── pages/
│ │ ├── ExperimentView.tsx
│ │ └── RunDetails.tsx
│ ├── components/
│ │ └── Sidebar.tsx
│ ├── lib/
│ │ └── api.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── index.html
├── vite.config.ts
└── package.json


---


---

## 🧩 Setup Guide

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv .venv
# Activate:
# Linux/macOS:
source .venv/bin/activate
# Windows:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
📍 Backend runs at → http://127.0.0.1:8000
📘 API Docs → http://127.0.0.1:8000/docs

2️⃣ Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm run dev
📍 Frontend runs at → http://127.0.0.1:5173

🧪 How to Use
1️⃣ Create an Experiment — from the sidebar
2️⃣ Start a Run — inside the experiment
3️⃣ Log Metrics — via the Run Details page
4️⃣ Visualize Metrics — see charts update automatically
5️⃣ Upload Artifacts — add files like models or logs

