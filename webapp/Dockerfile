FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production=false

COPY . .

FROM base AS build
RUN npm run build

FROM nginx:alpine AS production

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM base AS development
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
