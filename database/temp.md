# Docker build steps -- postgreSQL
## Important!
### Make notes for yourself! Note the names of all the pieces and keep handy while building
### It is entirely posible that you will forget what you named what
### My example:
*Image pulled from docker hub as postgres:latest*
- First part is my repo (on docker hub) name -- cole-matthew-bienek
- second is the image name -- /products-api:2 <-- the :2 is the tag name of this image, you assign that for your own reference

` image:cole-matthew-bienek/products-api:`

`container:api-data`

`db_name:primary_products_api`

`pass:1234`


`build script:  docker build -t cole-matthew-bienek/products-api:2 .` <-- don't forget the '.' at the end

run container with volume data:

`docker run --name api-data -v $HOME/Sync/SyncData/pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=primary_products_api -p 5432:5432 cole-matthew-bienek/products-api:2`

start psql:

execute cmd in container:

`docker exec -it api-data psql -U postgres -d primary_products_api`

copy script:

`\copy anime FROM '/var/lib/postgresql/data/AnimeList.csv' DELIMITER ',' CSV HEADER;`

REMEMBER TO DEL SYNCDATA!
docker terminal commands:

ps
start
stop
run
build

steps:
pull postgres image from docker hub
  -- or better--> create Dockerfile that pulls it for you
include:

## Dockerfile for postgres
FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB primary_products_api

COPY *.sql /docker-entrypoint-initdb.d/
ADD products.sql /docker-entrypoint-initdb.d/

RUN chmod a+r /docker-entrypoint-initdb.d/



