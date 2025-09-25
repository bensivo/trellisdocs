from model import Document, Field, TextField, NumberField, BooleanField, MarkdownField, AttachmentField
from schemas.document_schemas import CreateDocumentRequest, UpdateDocumentRequest
from service.db_svc import DBService
from typing import Dict, Any

class DocumentsSvc():
    """
    Handles basic document CRUD operations using database storage
    """
    def __init__(self, db_svc: DBService):
        self.db_svc = db_svc
    
    async def create_document(self, request: CreateDocumentRequest) -> Document:
        """
        Create a new document with the provided request data.

        :param request: CreateDocumentRequest object containing document details
        :return: The newly created Document object
        """
        # Insert document record
        doc_result = await self.db_svc.query(
            "INSERT INTO documents (name) VALUES ($1) RETURNING id, name, created_at",
            request.name
        )

        doc_row = doc_result[0]
        document_id = doc_row['id']

        # Insert property fields
        property_fields = []
        if request.property_fields:
            for field in request.property_fields:
                field_result = await self.db_svc.query(
                    "INSERT INTO property_fields (document_id, name, type, value) VALUES ($1, $2, $3, $4) RETURNING id",
                    document_id, field.name, field.type, str(field.value)
                )
                field = self._build_field(field_result[0]['id'], field.name, field.type, str(field.value))
                property_fields.append(field)

        # Insert content fields
        content_fields = []
        if request.content_fields:
            for field in request.content_fields:
                field_result = await self.db_svc.query(
                    "INSERT INTO content_fields (document_id, name, type, value) VALUES ($1, $2, $3, $4) RETURNING id",
                    document_id, field.name, field.type, str(field.value)
                )
                field = self._build_field(field_result[0]['id'], field.name, field.type, str(field.value))
                content_fields.append(field)

        return Document(
            id=document_id,
            name=doc_row['name'],
            property_fields=property_fields,
            content_fields=content_fields
        )

    async def list_documents(self) -> list[Document]:
        """
        Retrieve a list of all documents.
        TODO: add basic search/filter parameters

        :return: List of Document objects
        """
        documents_data = await self.db_svc.query("SELECT id FROM documents ORDER BY created_at DESC")
        document_ids = [doc['id'] for doc in documents_data]
        print(document_ids)

        documents = []
        for doc_id in document_ids: # TODO: some optimization here would be great, no duplicate call to get the document, and parallelism
            document = await self.get_document(doc_id)
            documents.append(document)

        return documents

    async def get_document(self, id: int) -> Document | None:
        """
        Retrieve a single document by its ID.

        :param id: The ID of the document to retrieve
        :return: The Document object if found, otherwise None
        """
        doc_raw = await self.db_svc.query("SELECT id, name, created_at FROM documents WHERE id = $1", id)
        if not doc_raw:
            return None
            
        fields_raw = await self.db_svc.query("""
            SELECT 
                'property_field' as kind, 
                pf.id as id,
                pf.name as name, 
                pf.type as type,
                pf.value as value
            FROM property_fields pf
            WHERE pf.document_id = $1
            UNION ALL 
            SELECT
                'content_field' as kind,
                cf.id as id,
                cf.name as name, 
                cf.type as type, 
                cf.value as value 
            FROM content_fields cf
            WHERE cf.document_id = $1
        """, id)

        property_fields = [f for f in fields_raw if f['kind'] == 'property_field']
        property_fields = [TextField(
            id=f['id'],
            name=f['name'],
            type=f['type'],
            value=f['value']
        ) for f in property_fields]

        content_fields = [f for f in fields_raw if f['kind'] == 'content_field']
        content_fields = [TextField(
            id=f['id'],
            name=f['name'],
            type=f['type'],
            value=f['value']
        ) for f in content_fields]

        return Document(
            id=doc_raw[0]['id'],
            name=doc_raw[0]['name'],
            property_fields=property_fields,
            content_fields=content_fields
        )

    async def update_document(self, document_id: int, request: UpdateDocumentRequest) -> Document | None:
        """
        Update a document. Only updates fields that are provided.

        For 'property_fields' and 'content_fields', treats the entire array as a single item,
        if provided, replaces all existing fields with the new ones.

        :param document_id: The ID of the document to update
        :param request: UpdateDocumentRequest object containing updated document details
        :return: The updated Document object if found, None if the document does not exist
        """
        # Check if document exists
        existing_doc = await self.db_svc.query("SELECT id FROM documents WHERE id = $1", document_id)
        if not existing_doc:
            return None

        # Update document name if provided
        if request.name is not None:
            await self.db_svc.query("UPDATE documents SET name = $1 WHERE id = $2", request.name, document_id)

        # Replace property fields if provided
        if request.property_fields is not None:
            await self.db_svc.query("DELETE FROM property_fields WHERE document_id = $1", document_id)
            for field in request.property_fields:
                await self.db_svc.query(
                    "INSERT INTO property_fields (document_id, name, type, value) VALUES ($1, $2, $3, $4)",
                    document_id, field.name, field.type, str(field.value)
                )

        # Replace content fields if provided
        if request.content_fields is not None:
            await self.db_svc.query("DELETE FROM content_fields WHERE document_id = $1", document_id)
            for field in request.content_fields:
                await self.db_svc.query(
                    "INSERT INTO content_fields (document_id, name, type, value) VALUES ($1, $2, $3, $4)",
                    document_id, field.name, field.type, str(field.value)
                )

        return await self.get_document(document_id)

    async def delete_document(self, id: int) -> None:
        """
        Delete a document by its ID.
        :param id: The ID of the document to delete
        """
        await self.db_svc.query("DELETE FROM documents WHERE id = $1", id)


    def _build_field(self, field_id: int, name: str, field_type: str, value: str) -> Field:
        """
        Helper to build the appropriate Field subclass based on the given type
        """
        if field_type == "text":
            return TextField(id=field_id, name=name, value=value)
        elif field_type == "number":
            return NumberField(id=field_id, name=name, value=float(value) if value else 0.0)
        elif field_type == "boolean":
            return BooleanField(id=field_id, name=name, value=value.lower() == 'true' if value else False)
        elif field_type == "markdown":
            return MarkdownField(id=field_id, name=name, value=value)
        elif field_type == "attachment":
            return AttachmentField(id=field_id, name=name, value=value)
        else:
            # Default to text field for unknown types
            return TextField(id=field_id, name=name, value=value)
