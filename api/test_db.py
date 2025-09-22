
from service.db import DBService
import asyncio

async def main():
    db_svc = DBService(
        connection_string='postgresql://username:password@localhost:5432/trellis'
    )

    await db_svc.connect()
    print("Connected to the database successfully.")

    await db_svc.query(f"""
        CREATE TABLE IF NOT EXISTS test_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL
        );
    """)
    print("Table created successfully.")

    await db_svc.query(
        "INSERT INTO test_table (name) VALUES ($1);", 
        "Sample Name"
    )
    print("Data inserted successfully.")

    results = await db_svc.query("SELECT * FROM test_table;")
    print("Query Results:", results)    
    print("Database operations completed successfully.")

if __name__ == "__main__":
    asyncio.run(main())