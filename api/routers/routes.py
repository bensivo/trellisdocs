from typing import Any, Optional
import asyncpg
from fastapi import APIRouter, Request
router = APIRouter()


@router.get("/time")
async def current_time(request: Request) -> dict[str, Any]:
    pool: Optional[asyncpg.Pool] = getattr(request.app.state, "db_pool", None)
    if not pool:
        return {"db": "not_configured"}
    async with pool.acquire() as conn:
        now = await conn.fetchval("SELECT NOW()")
    try:
        return {"now": now.isoformat()}
    except AttributeError:
        return {"now": str(now)}