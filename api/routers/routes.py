from schemas.document_schemas import CreateDocumentRequest, UpdateDocumentRequest
from typing import Any, Optional
import asyncpg
from fastapi import APIRouter, Request, Depends, HTTPException
from di import get_db_service, get_documents_service
from service.db_svc import DBService
from service.documents_svc import DocumentsSvc

router = APIRouter()

@router.get("/migrations")
async def get_migrations(request: Request, db: DBService = Depends(get_db_service)) -> list[Any]:
    res = await db.query("SELECT * FROM migrations")
    return res


@router.get("/health")
async def health_check(request: Request) -> dict[str, Any]:
    pool: Optional[asyncpg.Pool] = getattr(request.app.state, "db_pool", None)
    if not pool:
        err = getattr(request.app.state, "db_error", None)
        if err:
            return {"status": "degraded", "db": "error", "error": err}
        return {"status": "ok", "db": "not_configured"}
    try:
        async with pool.acquire() as conn:
            val = await conn.fetchval("SELECT 1")
        return {"status": "ok", "db": "up", "result": int(val)}
    except Exception as exc:
        return {"status": "degraded", "db": "error", "error": str(exc)}


#
# CRUD /documents
#
@router.post("/documents")
async def create_document(
    request: Request,
    create_document_request: CreateDocumentRequest,
    documents_service: DocumentsSvc = Depends(get_documents_service)
    ) -> Any:

    document = await documents_service.create_document(create_document_request)
    return document

@router.get("/documents")
async def get_documents(
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> Any:
    documents = await documents_service.list_documents()
    return documents

@router.get("/documents/{document_id}")
async def get_document(
    document_id: int,
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> Any:
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
) -> Any:
    document = await documents_service.update_document(document_id, update_request)
    if document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.delete("/documents/{document_id}")
async def delete_document(
    document_id: int,
    request: Request,
    documents_service: DocumentsSvc = Depends(get_documents_service)
) -> Any:
    await documents_service.delete_document(document_id)
    return {"status": "deleted"}