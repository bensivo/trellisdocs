from typing import Optional
from pydantic import BaseModel

class CreateFieldRequest(BaseModel):
    name: str
    type: str
    value: str

class CreateDocumentRequest(BaseModel):
    name: str
    source: str
    created_at: Optional[str] = None
    property_fields: list[CreateFieldRequest]
    content_fields: list[CreateFieldRequest]


class UpdateDocumentRequest(BaseModel):
    name: Optional[str] = None
    source: Optional[str] = None
    property_fields: Optional[list[CreateFieldRequest]] = None
    content_fields: Optional[list[CreateFieldRequest]] = None


class FieldResponse(BaseModel):
    id: int
    name: str
    type: str
    value: str

class DocumentResponse(BaseModel):
    id: int
    name: str
    source: str
    created_at: str
    property_fields: list[FieldResponse]
    content_fields: list[FieldResponse]

class DeleteDocumentResponse(BaseModel):
    status: str