# syntax=docker/dockerfile:1
# Multi-stage build: compile the Vite bundle, serve the static output with nginx.

# ---- Build stage ---------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime stage: serve static files -----------------------------------
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
# nginx runs in the foreground by default in this image.
