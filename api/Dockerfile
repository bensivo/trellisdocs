# Use uv with Python 3.12 (bookworm). Other tags are available if you need 3.11, etc.
FROM ghcr.io/astral-sh/uv:python3.13-bookworm

WORKDIR /api

COPY . .
RUN uv sync --frozen


EXPOSE 8000

# Default command can be overridden by docker-compose
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers"]
