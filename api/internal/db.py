from contextlib import asynccontextmanager
from typing import Any, Optional
from fastapi import FastAPI
import asyncpg


@asynccontextmanager
async def lifespan(app: FastAPI):
    dsn = "postgresql://postgres:postgres@db:5432/appdb"
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