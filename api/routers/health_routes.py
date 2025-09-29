import asyncpg
from typing import Any, Optional
from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/health")
async def health_check(request: Request) -> dict[str, Any]:
    # TODO: move all this logic to the service layer
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