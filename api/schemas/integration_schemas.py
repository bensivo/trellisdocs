from pydantic import BaseModel
from typing import Optional

class IntegrationSourceResponse(BaseModel):
    id: int
    name: str
    description: str
    icon: Optional[str] = None
    available: bool
