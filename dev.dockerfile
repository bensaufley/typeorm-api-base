FROM node:9.5.0
LABEL maintainer="Ben Saufley <contact@bensaufley.com>"
ENV NODE_ENV development

WORKDIR /tmp
COPY package.json yarn.lock /tmp/
RUN yarn install
RUN mkdir -p /usr/src/typeorm-api-base/ && cp -a /tmp/node_modules /usr/src/typeorm-api-base

WORKDIR /usr/src/typeorm-api-base
COPY . /usr/src/typeorm-api-base

CMD yarn start

EXPOSE 3000
EXPOSE 8788
