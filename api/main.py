from contextlib import asynccontextmanager
import os
from typing import Any, Optional

import asyncpg
from fastapi import FastAPI
from fastapi.routing import APIRouter
from routers.routes import router as api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    dsn = "postgresql://postgres:postgres@localhost:55432/appdb"
    pool: Optional[asyncpg.Pool] = None
    try:
        pool = await asyncpg.create_pool(dsn, min_size=1, max_size=10)
    except Exception as exc:
        app.state.db_error = str(exc)
    app.state.db_pool = pool
    try:
        yield
    finally:
        pool = getattr(app.state, "db_pool", None)
        if pool:
            await pool.close()

app = FastAPI(lifespan=lifespan)
app.include_router(api_router, prefix="/api")


@app.get("/health")
async def health_check() -> dict[str, Any]:
    pool: Optional[asyncpg.Pool] = getattr(app.state, "db_pool", None)
    if not pool:
        err = getattr(app.state, "db_error", None)
        if err:
            return {"status": "degraded", "db": "error", "error": err}
        return {"status": "ok", "db": "not_configured"}
    try:
        async with pool.acquire() as conn:
            val = await conn.fetchval("SELECT 1")
        return {"status": "ok", "db": "up", "result": int(val)}
    except Exception as exc:
        return {"status": "degraded", "db": "error", "error": str(exc)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
