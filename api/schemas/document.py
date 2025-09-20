from dataclasses import dataclass
from model import Field

@dataclass
class CreateDocumentRequest:
    name: str
    property_fields: list[Field]
    content_fields: list[Field]
