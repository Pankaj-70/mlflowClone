from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import experiments, runs, metrics, params
from .routers import experiments, runs, metrics, params, artifacts


# create DB tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="MLflow Clone API", version="0.1.0")

# allow React frontend to talk to API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routes
app.include_router(artifacts.router)
app.include_router(experiments.router)
app.include_router(runs.router)
app.include_router(metrics.router)
app.include_router(params.router)

@app.get("/")
def root():
    return {"status": "ok", "message": "MLflow Clone API running"}
