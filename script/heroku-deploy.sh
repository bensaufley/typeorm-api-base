#! /bin/sh

docker build \
  -f Production.dockerfile \
  -t typeormapibase:latest \
  --build-arg DATABASE_URL=$(heroku config:get DATABASE_URL) \
  --build-arg KOA_KEYS=$(heroku config:get KOA_KEYS) \
  .

docker tag typeormapibase:latest registry.heroku.com/sample-typeorm-gql-api/web
docker push registry.heroku.com/sample-typeorm-gql-api/web
