FROM node:12.12.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN apk update && \
    npm install -g npm @vue/cli && \
    npm install
