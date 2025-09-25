import json
from schemas.document_schemas import CreateDocumentRequest, UpdateDocumentRequest
from service import DocumentsSvc
from model import TextField
from dataclasses import asdict

svc = DocumentsSvc()
created_doc = svc.create_document(CreateDocumentRequest(
    name = 'foobar',
    property_fields=[
        TextField(
            id = 0,
            name = 'description',
            type = 'text',
            value = 'A test field'
        )
    ],
    content_fields=[
        TextField(
            id = 0,
            name = 'content',
            type = 'text',
            value = 'Heres the content of this document'
        )
    ]
))
print(json.dumps(asdict(created_doc), indent = 4))

retrieved_doc = svc.get_document(created_doc.id)
print(json.dumps(asdict(retrieved_doc), indent = 4))

updated_doc = svc.update_document(created_doc.id, UpdateDocumentRequest(
    name = 'foobar_updated',
    property_fields=[ ],
))
print(json.dumps(asdict(updated_doc), indent = 4))
