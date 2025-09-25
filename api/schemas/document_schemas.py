from dataclasses import dataclass
from typing import Optional
from model import Field


@dataclass
class CreateFieldRequest:
    name: str
    type: str
    value: str

@dataclass
class CreateDocumentRequest:
    name: str
    property_fields: list[CreateFieldRequest]
    content_fields: list[CreateFieldRequest]


@dataclass
class UpdateDocumentRequest:
    name: Optional[str] = None
    property_fields: Optional[list[Field]] = None
    content_fields: Optional[list[Field]] = None
