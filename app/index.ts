require('./globalPaths');

import * as Koa from 'koa';
//const routes  = require('routes');
import routes  from './routes';
const config  = require('config');
const logger  = require('lib/logger');
const common  = require('lib/common');

var app = new Koa();
// log routes and runtime in dev only
if(common.getEnv() === 'development') {
  app.use(require('lib/request-logger')());
}

// empty middleware, just catches everything
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (e) {
    logger.error(e);
    ctx.status = e.status || 500;
    ctx.body = JSON.stringify({success: false, msg: e.toString()});
    ctx.app.emit('error', e, ctx);
  }
});

app.use(routes);
app.listen(config.port);
export default app;
