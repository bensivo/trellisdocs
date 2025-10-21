"""
A DI container for all the global app dependencies
"""
from service.db_svc import DBService
from service.documents_svc import DocumentsSvc
from service.pipelines_svc import PipelineSvc
import os

db_service = None
documents_service = None
pipelines_service = None

async def initialize_dependencies():
    global db_service, documents_service, pipelines_service

    connection_string = os.getenv('DB_CONNECTION_STRING', 'postgresql://username:password@localhost:5432/trellis')

    db_service = DBService(
        connection_string = connection_string
    )
    await db_service.connect()

    documents_service = DocumentsSvc(db_service)
    pipelines_service = PipelineSvc(db_service)

"""
Getter functions that return the singleton instances of each service,
defined above.

These are for FastAPI's "Depends()" system of dependency injection. See routers.
"""
def get_db_service() -> DBService:
    return db_service

def get_documents_service() -> DocumentsSvc:
    return documents_service

def get_pipelines_service() -> PipelineSvc:
    return pipelines_service