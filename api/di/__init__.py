"""
A DI container for all the global app dependencies
"""

from api.service.db_svc import DBService
from service.documents import DocumentsSvc

db_service = None
documents_service = None

async def initialize_dependencies():
    global db_service, documents_service

    db_service = DBService(
        connection_string="postgresql://username:password@localhost:5432/trellis"
    )
    await db_service.connect()

    documents_service = DocumentsSvc(db_service)



"""
Getter functions that return the singleton instances of each service,
defined above.

These are for FastAPI's "Depends()" system of dependency injection. See routers.
"""
def get_db_service() -> DBService:
    return db_service

def get_documents_service() -> DocumentsSvc:
    return documents_service