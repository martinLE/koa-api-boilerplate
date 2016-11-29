'use strict'; //eslint-disable-line

require('./globalPaths');

const app     = require('koa')();
const routes  = require('routes');
// const parse   = require('co-body');
const config  = require('config');
const logger  = require('lib/logger');
const common  = require('lib/common');

// log routes and runtime in dev only
if(common.getEnv() === 'development') {
  app.use(require('lib/request-logger')());
}

// empty middleware, just catches everything
app.use(function *(next) {
  try {
    yield next;
  } catch (e) {
    logger.error(e);
    this.status = e.status || 500;
    this.body = JSON.stringify({success: false, msg: e.toString()});
    this.app.emit('error', e, this);
  }
});

app.use(routes);
app.listen(config.port);
module.exports = app;

