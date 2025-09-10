Trellis API

Run everything with docker:

- docker-compose up --build

Endpoints:

- GET `/api/health` — app + DB check (runs SELECT 1)
- GET `/api/time` — returns `NOW()` from Postgres

Environment:

- `DATABASE_URL` (optional): defaults to local Docker DB [TODO]
