const koaJwtAuth  = require('./middleware/koa-jwt-auth');
const koaRouter   = require('koa-router');
const db          = require('models');

// all routes in the API start with /api
const apiPrefix = '/api';
const router = new koaRouter({
  prefix: apiPrefix
});

// all users must be authenticated using their JWT-Token
router.use(koaJwtAuth.authenticateUser);

// also, return type is always JSON
router.use(function *(next) {
  this.type = 'application/json';
  yield next;
});

// load all routes from files
require('fs').readdirSync(__dirname).forEach(function(file) {
  if((file.indexOf('.js') > 0) && (file !== 'index.js')) {
    let route = require('./' + file);
    router.use(route.routes());
  }
});

// All routes, that are not defined explicitly, get a standard set of routes
const customRoutes = router.stack.map(i => i.path);
const defaultApiTables = ['publisher', 'campaign']; // don't male APIs for api_user or sequelize meta tables
defaultApiTables.forEach((apiTable) => {
  // get "/<table_name>" route for all entries
  let fullPath = apiPrefix + '/' + apiTable;
  if(customRoutes.indexOf(fullPath) == -1) {
    router.get('/' + apiTable, function* () {
      this.body = yield db[apiTable].findAll();
    });
  }
  // get "/<table_name>/:id" route for a single entry
  let fullPathSinlge = fullPath + '/:id';
  if(customRoutes.indexOf(fullPathSinlge) == -1) {
    router.get('/' + apiTable + '/:id', function* () {
      const data = yield db[apiTable].find({where: {id: this.params.id}});
      if(!data) {
        this.throw(404, `ID ${this.params.id} is unknown.`);
      }
      this.body = data;
    });
  }
});

module.exports = router.routes();
