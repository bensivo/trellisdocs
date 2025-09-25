from fastapi import FastAPI
from contextlib import asynccontextmanager
from routers.routes import router as api_router
from di import initialize_dependencies
import uvicorn

# Lifecycle hook to allow for async initialization
@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_dependencies()
    yield


if __name__ == "__main__":
    app = FastAPI(lifespan=lifespan)
    app.include_router(api_router, prefix="/api")
    uvicorn.run(app, host="0.0.0.0", port=8000)
