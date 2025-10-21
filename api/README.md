# Trellis API
FastAPI backend for Trellis document management system with PostgreSQL database.

## Running the Application
This project uses Justfile for most common development commands.

Start the PostgreSQL database with docker-compose:
```bash
just up
```

Then, in another terminal start the api
```bash
uv sync
just run
```

The API will be available at `http://localhost:8000`

## API Endpoints

- **GET** `/api/health` - Health check (app + database)
- **POST** `/api/documents` - Create a document
- **GET** `/api/documents` - List all documents
- **GET** `/api/documents/{document_id}` - Get a document by ID
- **PATCH** `/api/documents/{document_id}` - Update a document
- **DELETE** `/api/documents/{document_id}` - Delete a document
- **POST** `/api/pipelines` - Create a pipeline
- **GET** `/api/pipelines` - List all pipelines
- **GET** `/api/pipelines/{pipeline_id}` - Get a pipeline by ID
- **PATCH** `/api/pipelines/{pipeline_id}` - Update a pipeline
- **DELETE** `/api/pipelines/{document_id}` - Delete a pipeline

## Testing
E2E Testing for this api is available in the `api-e2e` module. It uses Jest for e2e testing for several reasons:
- The consumer of the API will be a Javascript webapp, so implementing the e2e tests in Javascript is natural
- Jest has much better built-in expectation utilities compared to pytest
- JS handles JSON natively, making development easier
- The "describe", "it" structure of jest test-suites is just better than pytest
