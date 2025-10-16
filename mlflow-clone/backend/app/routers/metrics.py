from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..deps import db_dep

router = APIRouter(prefix="/metrics", tags=["metrics"])

@router.post("/log", response_model=schemas.MetricOut)
def log_metric(payload: schemas.MetricCreate, db: Session = Depends(db_dep)):
    return crud.log_metric(db, payload)

@router.get("/{run_id}", response_model=list[schemas.MetricOut])
def list_metrics(run_id: str, db: Session = Depends(db_dep)):
    return crud.list_metrics(db, run_id)
