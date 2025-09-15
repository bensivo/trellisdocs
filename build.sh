#!/bin/bash
set -e

# Build and push to orgil9506 Docker Hub
echo "Building webapp..."
docker build -t orgil9506/trellisdocs-webapp:latest --target production ./webapp

echo "Building API..."
docker build -t orgil9506/trellisdocs-api:latest ./api

echo "Pushing to Docker Hub..."
docker push orgil9506/trellisdocs-webapp:latest
docker push orgil9506/trellisdocs-api:latest

echo "Done! Images pushed to orgil9506"
