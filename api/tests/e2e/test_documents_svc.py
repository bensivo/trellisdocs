from service.db_svc import DBService
from service.documents_svc import DocumentsSvc
from schemas.document_schemas import CreateDocumentRequest, CreateFieldRequest, UpdateDocumentRequest
import pytest

# NOTE: This is an e2e test, it requires a running Postgres instance
@pytest.mark.asyncio
async def test_document_crud():
    """
    Tests the full CRUD lifecycle of a document
        - Create document
        - List documents
        - Get document by ID
        - Update document
        - Delete document
    """
    db_svc = DBService("postgresql://username:password@localhost:5432/trellis")
    await db_svc.connect()
    documents_svc = DocumentsSvc(db_svc)

    # When: I call create_document
    doc = await documents_svc.create_document(CreateDocumentRequest(
        name = 'foobar',
        property_fields=[
            CreateFieldRequest( name = 'project', type = 'text', value = 'Trellis'),
            CreateFieldRequest( name = 'team', type = 'text', value = 'Fullstack'),
        ],
        content_fields=[
            CreateFieldRequest( name = 'summary', type = 'text', value = 'Heres the content of this document'),
            CreateFieldRequest( name = 'description', type = 'text', value = 'Heres the content of this document')
        ]
    ))

    # Then: I get the document back, with all the fields I passed in
    assert doc.id is not None
    assert doc.id > 0
    assert doc.name == "foobar"
    assert doc.property_fields[0].name == "project"
    assert doc.property_fields[0].value == "Trellis"
    assert doc.content_fields[0].name == "summary"
    assert doc.content_fields[0].value == "Heres the content of this document"

    # When: I call list_documents
    docs = await documents_svc.list_documents()

    # Then: I get a list of documents back
    num_docs = len(docs)
    assert len(docs) > 0

    # When: I call get_document with a specific ID
    fetched_doc = await documents_svc.get_document(doc.id)

    # Then: I get the correct document back
    assert fetched_doc.id == doc.id
    assert fetched_doc.name == doc.name

    # When: I call update_document, only updating some fields
    updated_doc = await documents_svc.update_document(doc.id, UpdateDocumentRequest(
        name = 'foobar-updated',
        property_fields=[
            CreateFieldRequest( name = 'project', type = 'text', value = 'trellis-updated'),
        ],
    ))

    # Then: I get the whole updated document back
    # Then: The fields I passed have been updated
    # Then: The fields I didn't pass are unchanged
    assert updated_doc.id == doc.id
    assert updated_doc.name == "foobar-updated"
    assert updated_doc.property_fields[0].value == "trellis-updated" 
    assert updated_doc.content_fields[0].name == "summary" # Because content_fields wasn't in the request, it should not be updated

    # When: I call delete_document
    await documents_svc.delete_document(doc.id)

    # Then: The document is deleted
    fetched_doc = await documents_svc.get_document(doc.id)
    assert fetched_doc is None

    # Then: There is one less document in the list
    docs = await documents_svc.list_documents()
    assert len(docs) == num_docs - 1