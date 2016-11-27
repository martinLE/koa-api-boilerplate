FROM alpine:edge

RUN echo http://nl.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories  &&\
    apk add --no-cache curl bash sudo gosu libpq postgresql-client postgresql postgresql-contrib

RUN mkdir /docker-entrypoint-initdb.d

ENV LANG en_US.utf8
ENV PGDATA /var/lib/postgresql/data
VOLUME /var/lib/postgresql/data

COPY lib/postgresql-entrypoint.sh /

ENTRYPOINT ["/postgresql-entrypoint.sh"]

EXPOSE 5432
CMD ["postgres"]


# manually:
# docker build -t alpine-postgres -f postgresql.dockerfile ./
# docker run --name koa-api-db -d -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=api alpine-postgres
# Access DB:
# docker exec -ti koa-api-db sudo -u postgres psql api
