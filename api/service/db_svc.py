import asyncpg
from typing import Dict, Any, List

migrations = [
    {
        'name': '001_create_documents_table',
        'up': """
            CREATE TABLE documents (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        """,
        'down': """
            DROP TABLE IF EXISTS documents
        """
    },
    {
        'name': '002_create_property_fields_table',
        'up': """
            CREATE TABLE property_fields (
                id SERIAL PRIMARY KEY,
                document_id INT REFERENCES documents(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                value TEXT
            )
        """,
        'down': """
            DROP TABLE IF EXISTS property_fields
        """
    },
    {
        'name': '003_create_content_fields_table',
        'up': """
            CREATE TABLE content_fields (
                id SERIAL PRIMARY KEY,
                document_id INT REFERENCES documents(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                value TEXT
            )
        """,
        'down': """
            DROP TABLE IF EXISTS content_fields
        """
    },
    {
        'name': '004_create_pipelines_table',
        'up': """
            CREATE TABLE pipelines (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                cron_string TEXT NOT NULL,
                configs TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        """,
        'down': """
            DROP TABLE IF EXISTS pipelines
        """
    },
    {
        'name': '005_add_source_to_documents',
        'up': """
            ALTER TABLE documents
            ADD COLUMN source TEXT NOT NULL DEFAULT 'unknown'
        """,
        'down': """
            ALTER TABLE documents
            DROP COLUMN IF EXISTS source
        """
    },
]

class DBService:
    """
    Service to interact with the database.
    """
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.conn = None
    
    async def connect(self):
        """
        Call at the beginning of the app to connect to the database.
        """
        self.conn = await asyncpg.connect(
            dsn=self.connection_string,
        )

        await self.run_migrations()

    async def close(self):
        """
        Call at the end of the app to close the database connection.
        """
        if self.conn:
            await self.conn.close()
        
    async def query(self, query_string: str, *params) -> List[Dict[str, Any]]:
        """
        Execute a query against the database using fetch.
        Returns the raw query results as list of dicts.
        """
        if not self.conn:
            raise Exception("Database not connected")
        
        rows = await self.conn.fetch(query_string, *params)
        return [dict(row) for row in rows]

    async def run_migrations(self):
        """
        Run through all migrations, and execute any that haven't been applied yet.
        """
        await self.conn.fetch("""
            CREATE TABLE IF NOT EXISTS migrations (
                name TEXT PRIMARY KEY,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        """)

        for migration in migrations:
            existing = await self.conn.fetchrow(
                "SELECT name FROM migrations WHERE name = $1",
                migration['name']
            )

            if existing:
                continue

            async with self.conn.transaction():
                await self.conn.execute(migration['up'])
                await self.conn.execute(
                    "INSERT INTO migrations (name) VALUES ($1)",
                    migration['name']
            )