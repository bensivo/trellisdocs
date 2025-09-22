from typing import Any, Optional
import asyncpg
from fastapi import APIRouter, Request, Depends
from dependencies import get_db_service
from service.db import DBService

router = APIRouter()

@router.get("/migrations")
async def get_migrations( request: Request, db: DBService = Depends(get_db_service)) -> list[Any]:
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