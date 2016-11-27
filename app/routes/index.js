const koaJwtAuth  = require('./middleware/koa-jwt-auth');
const koaRouter   = require('koa-router');
const db          = require('models');


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


router.get('/', function *(next) {

  let user = yield db.apiUser.findById(1);

  this.body = {aha: user};


  yield next;
});

module.exports = router.routes();
