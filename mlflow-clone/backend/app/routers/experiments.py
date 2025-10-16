from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..deps import db_dep

router = APIRouter(prefix="/experiments", tags=["experiments"])

@router.post("/", response_model=schemas.ExperimentOut)
def create_experiment(data: schemas.ExperimentCreate, db: Session = Depends(db_dep)):
    return crud.create_experiment(db, data)

@router.get("/", response_model=list[schemas.ExperimentOut])
def list_experiments(db: Session = Depends(db_dep)):
    return crud.list_experiments(db)
