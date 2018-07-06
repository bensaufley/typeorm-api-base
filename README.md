[![Maintainability](https://api.codeclimate.com/v1/badges/f35b76e15fd92548a341/maintainability)](https://codeclimate.com/github/bensaufley/typeorm-api-base/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f35b76e15fd92548a341/test_coverage)](https://codeclimate.com/github/bensaufley/typeorm-api-base/test_coverage)
[![CircleCI](https://circleci.com/gh/bensaufley/typeorm-api-base/tree/master.svg?style=shield&circle-token=ddd3af8267f82d39af1282a8440b5c386049648f)](https://circleci.com/gh/bensaufley/typeorm-api-base/tree/master)

# TypeORM API Base

A base from which to build a full-fledged TypeORM- and Apollo/GraphQL-based API server.

# Scripts

This repo uses [Docker](https://www.docker.com/).

- `script/server`  builds and starts a new server, including a
  database container.
- `script/test`  runs tests in docker container. You can view coverage
  at [/_coverage](http://localhost:7290/_coverage) with your server running.
