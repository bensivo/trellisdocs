from fastapi import FastAPI
from contextlib import asynccontextmanager
from routers.health_routes import router as health_router
from routers.document_routes import router as document_router
from di import initialize_dependencies
import uvicorn

# Lifecycle hook to allow for async initialization
@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_dependencies()
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(health_router, prefix="/api")
app.include_router(document_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
