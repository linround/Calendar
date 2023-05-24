FROM node:18

COPY ./ /app
WORKDIR /app
RUN npm -g install
RUN npm install
RUN npm run build

