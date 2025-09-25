from dataclasses import dataclass
from typing import Optional
from model import Field

@dataclass
class CreateDocumentRequest:
    name: str
    property_fields: list[Field]
    content_fields: list[Field]

@dataclass
class UpdateDocumentRequest:
    name: Optional[str] = None
    property_fields: Optional[list[Field]] = None
    content_fields: Optional[list[Field]] = None
