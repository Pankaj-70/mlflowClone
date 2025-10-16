from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ---------- Experiments ----------
class ExperimentCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ExperimentOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

# ---------- Runs ----------
class RunCreate(BaseModel):
    experiment_id: int
    name: Optional[str] = None

class RunOut(BaseModel):
    id: str
    experiment_id: int
    name: Optional[str]
    status: str
    start_time: datetime
    end_time: Optional[datetime]
    class Config:
        from_attributes = True

# ---------- Params ----------
class ParamCreate(BaseModel):
    run_id: str
    key: str
    value: str

class ParamOut(BaseModel):
    id: int
    run_id: str
    key: str
    value: str
    class Config:
        from_attributes = True

# ---------- Metrics ----------
class MetricCreate(BaseModel):
    run_id: str
    key: str
    value: float

class MetricOut(BaseModel):
    id: int
    run_id: str
    key: str
    value: float
    timestamp: datetime
    class Config:
        from_attributes = True
