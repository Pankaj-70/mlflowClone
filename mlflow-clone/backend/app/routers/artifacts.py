from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
from ..deps import db_dep
from .. import crud

router = APIRouter(prefix="/artifacts", tags=["artifacts"])

STORAGE_ROOT = Path(__file__).resolve().parents[2] / "storage" / "artifacts"
STORAGE_ROOT.mkdir(parents=True, exist_ok=True)

@router.post("/{run_id}/upload")
def upload_artifact(run_id: str, file: UploadFile = File(...), db: Session = Depends(db_dep)):
    run_dir = STORAGE_ROOT / run_id
    run_dir.mkdir(parents=True, exist_ok=True)
    dest = run_dir / file.filename

    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    row = crud.create_artifact(
        db,
        run_id=run_id,
        filename=file.filename,
        path=str(dest.relative_to(STORAGE_ROOT.parent)),
        filetype=file.content_type,
        size_bytes=dest.stat().st_size,
    )
    return {"ok": True, "artifact_id": row.id, "filename": row.filename}

@router.get("/{run_id}")
def list_artifacts(run_id: str, db: Session = Depends(db_dep)):
    rows = crud.list_artifacts(db, run_id)
    return rows
