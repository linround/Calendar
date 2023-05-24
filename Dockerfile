# syntax=docker/dockerfile:1
FROM node:18-alpine as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as build
RUN npm ci
COPY . .
RUN npm run build

