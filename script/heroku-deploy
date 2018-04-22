#! /bin/sh

docker build \
  -f Production.dockerfile \
  -t typeormapibase:latest \
  .

docker tag typeormapibase:latest registry.heroku.com/sample-typeorm-gql-api/web
docker push registry.heroku.com/sample-typeorm-gql-api/web
