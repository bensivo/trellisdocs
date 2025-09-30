# Trellis API

FastAPI backend for Trellis document management system with PostgreSQL database.

## Running the Application

### Local Development with Docker
This project uses Justfile for most common development commands.

Start the API and PostgreSQL database with docker-compose:
```bash
just up
```

The API will be available at `http://localhost:8000`

### Python Dependencies

This project uses `uv` for package management. Dependencies are defined in `pyproject.toml`.

## API Endpoints

- **GET** `/api/health` - Health check (app + database)
- **POST** `/api/documents` - Create a document
- **GET** `/api/documents` - List all documents
- **GET** `/api/documents/{document_id}` - Get a document by ID
- **PATCH** `/api/documents/{document_id}` - Update a document
- **DELETE** `/api/documents/{document_id}` - Delete a document

## Testing

### Pytest
This app uses pytest for testing.

Run all defined e2e tests with:
```bash
just e2e
```