const koaJwtAuth  = require('./middleware/koa-jwt-auth');
const koaRouter = require('koa-router');
//import router from 'koa-router'; FIXME: TS complains: "Cannot find module 'koa-router'."
import db from '../models';

import publisher from './publisher';

// all routes in the API start with /api
const apiPrefix = '/api';
const router = new koaRouter({
  prefix: apiPrefix
});

router.use(publisher.routes());

// all users must be authenticated using their JWT-Token
router.use(koaJwtAuth.authenticateUser);

// also, return type is always JSON
router.use(async(ctx, next) => {
  ctx.type = 'application/json';
  await next();
});

// load all routes from files
// require('fs').readdirSync(__dirname).forEach(function(file) {
//   if((file.indexOf('.ts') > 0) && (file !== 'index.ts')) {
//     let filename = './' + file;
//     import route from filename;
//     router.use(route.routes());
//   }
// });

// All routes, that are not defined explicitly, get a standard set of routes
const customRoutes = router.stack.map(i => i.path);
const defaultApiTables = ['publisher', 'campaign']; // don't male APIs for api_user or sequelize meta tables
defaultApiTables.forEach((apiTable) => {
  // get "/<table_name>" route for all entries
  let fullPath = apiPrefix + '/' + apiTable;
  if(customRoutes.indexOf(fullPath) == -1) {
    router.get('/' + apiTable, async(ctx, next) => {
      ctx.body = await db[apiTable].findAll();
      await next();
    });
  }
  // get "/<table_name>/:id" route for a single entry
  let fullPathSinlge = fullPath + '/:id';
  if(customRoutes.indexOf(fullPathSinlge) == -1) {
    router.get('/' + apiTable + '/:id', async(ctx, next) => {
      const data = await db[apiTable].find({where: {id: this.params.id}});
      if(!data) {
        ctx.throw(404, `ID ${this.params.id} is unknown.`);
      }
      ctx.body = data;
      await next();
    });
  }
});

export default router.routes();
