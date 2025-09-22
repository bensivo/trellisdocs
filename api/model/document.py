from dataclasses import dataclass
from typing import Union
from abc import ABC

@dataclass
class AbsField(ABC):
    id: int
    name: str
    type: str

@dataclass
class TextField(AbsField):
    type: str = "text"
    value: str = ""

@dataclass
class NumberField(AbsField):
    type: str = "number"
    value: float = 0.0

@dataclass
class BooleanField(AbsField):
    type: str = "boolean"
    value: bool = False

@dataclass
class MarkdownField(AbsField):
    type: str = "markdown"
    value: str = ""

@dataclass
class AttachmentField(AbsField):
    type: str = "attachment"
    value: str = ""

Field = Union[TextField, NumberField, BooleanField, MarkdownField, AttachmentField]

@dataclass
class Document:
    id: int
    name: str
    property_fields: list[Field]
    content_fields: list[Field]