FROM mhart/alpine-node:6

WORKDIR /src

RUN apk add --no-cache sudo bash git

COPY lib/dev.sh /

# install global packages
RUN npm install -g \
    nodemon \
    eslint \
    npm-check-updates \
    git+https://git@github.com/martinLE/cli

EXPOSE 3000
CMD "/dev.sh"

# manually:
# docker build -t koa-api-node -f node.dockerfile ./
# docker run --name koa-api-node -d -v <localPath>:/src -p 3000:3000 --link koa-api-db:db koa-api-node
