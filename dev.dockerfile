FROM node:9.8.0
LABEL maintainer="Ben Saufley <contact@bensaufley.com>"
ENV NODE_ENV development
ENV DATABASE_URL postgres://pguser:pgpass@db:5432/typeorm_api_development
ENV KOA_KEYS sample-development-key

WORKDIR /tmp
COPY package.json yarn.lock /tmp/
RUN yarn install
RUN mkdir -p /usr/src/typeorm-api-base/ && cp -a /tmp/node_modules /usr/src/typeorm-api-base

WORKDIR /usr/src/typeorm-api-base
COPY . /usr/src/typeorm-api-base

RUN useradd -m myuser
USER myuser

EXPOSE 3000
