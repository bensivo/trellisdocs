from fastapi import FastAPI
from routers.routes import router as api_router
from internal.db import lifespan


app = FastAPI(lifespan=lifespan)
app.include_router(api_router, prefix="/api")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
