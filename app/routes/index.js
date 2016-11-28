const koaJwtAuth  = require('./middleware/koa-jwt-auth');
const koaRouter   = require('koa-router');

// all routes in the API start with /api
const router = new koaRouter({
  prefix: '/api'
});

// all users must be authenticated using their JWT-Token
router.use(koaJwtAuth.authenticateUser);

// also, return type is always JSON
router.use(function *(next) {
  this.type = 'application/json';
  yield next;
});

// load all routes from files
require("fs").readdirSync(__dirname).forEach(function(file) {
  if((file.indexOf('.js') > 0) && (file !== 'index.js')) {
   let route = require('./' + file);
   router.use(route.routes());
  }
});

module.exports = router.routes();
