from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..deps import db_dep

router = APIRouter(prefix="/runs", tags=["runs"])

@router.post("/", response_model=schemas.RunOut)
def create_run(data: schemas.RunCreate, db: Session = Depends(db_dep)):
    return crud.create_run(db, data)

@router.post("/{run_id}/finish", response_model=schemas.RunOut)
def finish_run(run_id: str, db: Session = Depends(db_dep)):
    run = crud.finish_run(db, run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    return run

@router.get("/by-experiment/{experiment_id}", response_model=list[schemas.RunOut])
def list_runs(experiment_id: int, db: Session = Depends(db_dep)):
    return crud.list_runs_for_experiment(db, experiment_id)
