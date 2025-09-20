from service import DocumentsSvc, CreateDocumentRequest
from model import TextField

svc = DocumentsSvc(base_path='./data')
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
print(created_doc)

retrieved_doc = svc.get_document(created_doc.id)
print(retrieved_doc)