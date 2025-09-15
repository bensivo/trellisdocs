#!/bin/bash
set -e

# Simple EC2 deployment
docker network create trellis-network 2>/dev/null || true

# Stop existing containers
docker stop trellis-db trellis-api trellis-webapp 2>/dev/null || true
docker rm trellis-db trellis-api trellis-webapp 2>/dev/null || true

# Start database
docker run -d --name trellis-db --network trellis-network \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=appdb \
  -v trellis_pgdata:/var/lib/postgresql/data postgres:16

# Wait for database to be ready
echo "Waiting for database..."
sleep 15

# Check if database is ready
until docker exec trellis-db pg_isready -U postgres -d appdb; do
  echo "Database not ready, waiting..."
  sleep 5
done

# Pull and start services
docker pull orgil9506/trellisdocs-api:latest
docker pull orgil9506/trellisdocs-webapp:latest

docker run -d --name trellis-api --network trellis-network -p 8000:8000 \
  -e DATABASE_URL=postgresql://postgres:postgres@trellis-db:5432/appdb \
  -e DB_HOST=trellis-db \
  orgil9506/trellisdocs-api:latest

docker run -d --name trellis-webapp --network trellis-network -p 3000:80 \
  orgil9506/trellisdocs-webapp:latest

echo "Deployed! API: localhost:8000, Webapp: localhost:3000"

# Wait for API to start and test
echo "Testing API connection..."
sleep 10
curl http://localhost:8000/api/health || echo "API not ready yet"
