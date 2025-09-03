Project layout




Run the API with auto-reload and load env vars:
- From api/: uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000

Endpoints:
- GET `/health` — app + DB check (runs SELECT 1)
- GET `/api/time` — returns `NOW()` from Postgres

Environment:
- `DATABASE_URL` (optional): defaults to local Docker DB
