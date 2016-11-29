# koa-api-boilerplate

---

## About

This is a starter boilerplate RESTful API using the following technologies:

* [Koa](https://github.com/koajs/koa) Middleware
* [JWT](https://jwt.io/) for authentication
* [Sequelize](https://github.com/sequelize/sequelize) ORM
* [PostgreSQL](https://www.postgresql.org/)
* [ESLint](http://eslint.org) to maintain a consistent code style
* [mocha](https://mochajs.org/) for tests
* [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/) as a dev environment


## Getting Started

You'll need to install docker compose. Then run
```bash
docker-compose up
```
This will start a node container ("koa-api-node") and a postgres container ("koa-api-db"). When starting for the first time, the DB must be seeded. Log in to the node container and run the job:
```bash
docker exec -ti koa-api-node bash -l
npm run reset
```

Now you can test the API with this curl statemant:
```bash
curl -v \
-H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhcGlfdXNlcl9pZCI6MSwiaWF0IjoxNDgwMTg1NTU1fQ.XbC-sHHbWptx6eAWMVlumqfFq_CQZ6ZYtqZ7axwXRiX2ASRmpPxjUeN-_aF0TKF5bv3as5AlrocNev_-lqr5vwoWskvAjHuPafcfbZ4MB86rvUjRWRg5zDVUUc1SemR8f-gpFohO7AhKzDuyRxN3R0sSyDJrheE13Hy5-vQDbo8" \
http://127.0.0.1:3000/api/campaign
```
