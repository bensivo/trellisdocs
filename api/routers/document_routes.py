from schemas.document_schemas import CreateDocumentRequest, UpdateDocumentRequest, DocumentResponse, DeleteDocumentResponse
from typing import Any
from fastapi import APIRouter, Request, Depends, HTTPException
from di import get_documents_service
from service.documents_svc import DocumentsSvc

router = APIRouter()

@router.post("/documents")
async def create_document(
    request: Request,
    create_document_request: CreateDocumentRequest,
    documents_service: DocumentsSvc = Depends(get_documents_service)
    ) -> DocumentResponse:

    document = await documents_service.create_document(create_document_request)
    return document

@router.get("/documents")
async def get_documents(
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> list[DocumentResponse]:
    documents = await documents_service.list_documents()
    return documents

@router.get("/documents/{document_id}")
async def get_document(
    document_id: int,
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> DocumentResponse:
    document = await documents_service.get_document(document_id)
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.patch("/documents/{document_id}")
async def update_document(
    document_id: int,
    request: Request,
    update_request: UpdateDocumentRequest,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> DocumentResponse:
    document = await documents_service.update_document(document_id, update_request)
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.delete("/documents/{document_id}")
async def delete_document(
    document_id: int,
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> DeleteDocumentResponse:
    await documents_service.delete_document(document_id)
    return {"status": "deleted"}