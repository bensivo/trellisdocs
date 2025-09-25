from service.db_svc import DBService
import pytest

# NOTE: This is an e2e test, it requires a running Postgres instance
@pytest.mark.asyncio
async def test_db_connect():
    """
    Tests connecting to the database and running a simple query
    """
    db_svc = DBService("postgresql://username:password@localhost:5432/trellis")
    await db_svc.connect()
    assert db_svc.conn is not None

    res = await db_svc.query("SELECT 1 as value")
    assert res[0]['value'] == 1

    await db_svc.close()