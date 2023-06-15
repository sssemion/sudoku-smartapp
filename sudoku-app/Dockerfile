FROM node:18-alpine
MAINTAINER sssemion
COPY . /app/sudoku-app

WORKDIR /app/sudoku-app
RUN npm install --silent --registry=https://registry.npmjs.org/

RUN npm run build
ENTRYPOINT npm run dev -- --host 0.0.0.0 --port $PORT
