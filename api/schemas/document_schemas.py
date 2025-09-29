from typing import Optional
from pydantic import BaseModel, Field as PydanticField
from model import Field

class CreateFieldRequest(BaseModel):
    name: str
    type: str
    value: str

class CreateDocumentRequest(BaseModel):
    name: str
    property_fields: list[CreateFieldRequest]
    content_fields: list[CreateFieldRequest]


class UpdateDocumentRequest(BaseModel):
    name: Optional[str] = None
    property_fields: Optional[list[CreateFieldRequest]] = None
    content_fields: Optional[list[CreateFieldRequest]] = None