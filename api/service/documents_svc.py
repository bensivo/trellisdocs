from model import Document, Field, TextField
from schemas.document_schemas import CreateDocumentRequest, UpdateDocumentRequest

documents = []

class DocumentsSvc():
    """
    Handles basic document CRUD operations
    """
    def __init__(self):
        self.db_svc = None
    
    def create_document(self, request: CreateDocumentRequest) -> Document:
        """
        Create a new document with the provided request data.

        :param request: CreateDocumentRequest object containing document details
        :return: The newly created Document object
        """
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
        """
        Retrieve a list of all documents.
        TODO: add basic search/filter parameters

        :return: List of Document objects
        """
        return documents

    def get_document(self, id: int) -> Document | None:
        """
        Retrieve a single document by its ID.

        :param id: The ID of the document to retrieve
        :return: The Document object if found, otherwise None
        """
        document = next((d for d in documents if d.id == id), None)
        return document

    def update_document(self, document_id: int, request: UpdateDocumentRequest) -> Document | None:
        """
        Update a document. Only updates fields that are provided.

        For 'property_fields' and 'content_fields', treats the entire array as a single item,
        if provided, replaces all existing fields with the new ones.

        :param document_id: The ID of the document to update
        :param request: UpdateDocumentRequest object containing updated document details
        :return: The updated Document object if found, None if the document does not exist
        """
        document = self.get_document(document_id)
        if document is None:
            return None

        if request.name is not None:
            document.name = request.name

        if request.property_fields is not None:
            document.property_fields = request.property_fields

        if request.content_fields is not None:
            document.content_fields = request.content_fields
        
        return document
