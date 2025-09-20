from model import Document, Field, TextField
from schemas import CreateDocumentRequest

documents = []

class DocumentsSvc():
    """
    Handles basic document CRUD operations
    """
    def __init__(self, db_svc):
        self.db_svc = db_svc
    
    def create_document(self, request: CreateDocumentRequest) -> Document:
        if len(documents) == 0:
            max_id = 0
        else: 
            max_id = max([d.id for d in documents])

        document = Document(
            id = max_id + 1,
            name = request.name,
            property_fields = request.property_fields,
            content_fields= request.content_fields
        )

        documents.append(document)
        return document

    def list_documents(self) -> list[Document]:
        return documents

    def get_document(self, id: int) -> Document | None:
        document = next((d for d in documents if d.id == id), None)
        return document

    def update_document(self):
        pass

if __name__ == '__main__':
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
    print(created_doc)

    retrieved_doc = svc.get_document(created_doc.id)
    print(retrieved_doc)