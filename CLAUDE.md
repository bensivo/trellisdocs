# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### API (Python FastAPI)
- **Local development**: `cd api && docker-compose up --build`
- **Python dependencies**: Uses `uv` package manager (see `pyproject.toml`)
- **Database**: PostgreSQL runs in Docker container
- **Health check**: `GET /api/health` (app + DB check)
- **Test endpoint**: `GET /api/time` (returns NOW() from Postgres)
- **Manual testing**: `cd api && python test_db.py` (basic DB connection test)

### Webapp (React + TypeScript)
- **Development server**: `cd webapp && npm run dev`
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Linting**: `npm run lint` (ESLint)
- **Preview**: `npm run preview`
- **TypeScript**: `tsc -b` (type checking without build)

### Deployment
- **Build and push images**: `./build.sh` (builds and pushes to orgil9506 Docker Hub)
- **Deploy to EC2**: `./deploy-ec2.sh` (sets up Docker network and containers)

## Architecture

### Full-Stack Application Structure
- **Backend**: FastAPI (Python 3.13) with PostgreSQL
- **Frontend**: React 19 + TypeScript + Vite
- **Authentication**: OIDC-based with react-oidc-context
- **Deployment**: Docker containers with custom networking

### API Architecture
- **Dependency Injection**: Custom DI container in `dependencies/__init__.py`
  - Singleton services: `db_service`, `documents_service`
  - FastAPI Depends() pattern for injection
- **Database**:
  - Custom migration system in `service/db.py` with up/down scripts
  - asyncpg for async PostgreSQL connections
  - Manual schema: documents + property_fields tables
- **Structure**:
  - `routers/` - FastAPI route definitions
  - `service/` - Business logic (DBService, DocumentsSvc)
  - `model/` - Data models
  - `schemas/` - Pydantic schemas

### Frontend Architecture
- **State Management**:
  - Primary: Jotai (atomic state)
  - Available: Redux Toolkit (installed but unused)
- **Styling**: Less CSS with Vite preprocessing
- **Icons**: RemixIcon
- **Protected Routes**: `LoginWrapper` component wraps authenticated pages
- **Pages**:
  - `/` - HomePage (protected)
  - `/login` - LoginPage (public)
  - `/template` - TemplateBrowserPage (protected)
  - `/template/new` - TemplateEditorPage (protected)

### Database Schema
```sql
-- Core tables from migration system
documents (id, name, created_at)
property_fields (id, document_id, name, type, value)
```

## Key Patterns

### API Service Pattern
Services are initialized in `dependencies/__init__.py` lifecycle:
```python
db_service = DBService(connection_string)
await db_service.connect()
documents_service = DocumentsSvc(db_service)
```

### Database Migrations
Manual migration system in `service/db.py` with versioned up/down scripts. Migrations run automatically on service initialization.

### Frontend Authentication Flow
- OIDC authentication with `oidc-client-ts`
- `LoginWrapper` protects routes, redirects to `/login` if unauthenticated
- React Router handles SPA navigation

### Docker Configuration
- API: Port 8000, health checks via `/api/health`
- Webapp: Port 3000 (mapped to 80 in container)
- Database: PostgreSQL 16, persistent volume `trellis_pgdata`
- Network: `trellis-network` for container communication

## Environment Variables

### API
- `DATABASE_URL`: PostgreSQL connection string (optional, defaults to Docker setup)
- `DB_HOST`: Database host for Docker networking

### Development Notes
- API uses `uv` for Python dependency management instead of pip
- Webapp uses Vite for fast development and building
- Less CSS preprocessing enabled with `javascriptEnabled: true`
- Docker health checks ensure proper service startup ordering