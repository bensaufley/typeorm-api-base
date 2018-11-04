FROM node:10.13.0
LABEL maintainer "Ben Saufley <contact@bensaufley.com>"
ENV NODE_ENV production
ENV DATABASE_URL ${DATABASE_URL}
ENV KOA_KEYS ${KOA_KEYS}

WORKDIR /tmp
COPY package.json yarn.lock /tmp/
RUN yarn install
RUN mkdir -p /usr/src/typeorm-api-base/ && cp -a /tmp/node_modules /usr/src/typeorm-api-base

WORKDIR /usr/src/typeorm-api-base
COPY . /usr/src/typeorm-api-base

RUN yarn build

RUN useradd -m myuser
USER myuser

CMD yarn start

EXPOSE 3000
