from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..deps import db_dep

router = APIRouter(prefix="/params", tags=["params"])

@router.post("/log", response_model=schemas.ParamOut)
def log_param(payload: schemas.ParamCreate, db: Session = Depends(db_dep)):
    return crud.log_param(db, payload)

@router.get("/{run_id}", response_model=list[schemas.ParamOut])
def list_params(run_id: str, db: Session = Depends(db_dep)):
    return crud.list_params(db, run_id)
