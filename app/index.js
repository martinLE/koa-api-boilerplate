'use strict'; //eslint-disable-line

require('./globalPaths');

const app     = require('koa')();
// const parse   = require('co-body');
// const config  = require('config');
// const logger  = require('lib/logger');
const routes  = require('routes');
const common  = require('lib/common');
// var jwt = require('koa-jwt');
// var fs = require('fs');
// var publicKey = fs.readFileSync('demo.rsa.pub');
// var privateKey = fs.readFileSync('demo.rsa');

// log routes and runtime in dev only
if(common.getEnv() === 'development') {
  app.use(require('lib/request-logger')());
}


/*General middleware, always triggerd.
Maybe use for logging later?
app.use(function *(next) {
  logger.info('random middleware');
  yield next;
});*/


// app.use(function *(next) {
//     let claims = {id:2}
//     claims = { '{blabla:blub, app_user_id:2}': 'xyz', apidapi:2 }
//     let token = jwt.sign(claims, privateKey, {algorithm: 'RS256'});
//     //let claims = yield parse(this);
//     this.status = 200;
//     this.body = {token: token};
//     console.log(token)
//     yield next;
// });


app.use(routes);//.use(router.allowedMethods());


app.listen(3000);

/*
// JWT Error Catcher
app.use(function *(next) {
  try {
    yield next; //Attempt to go through the JWT Validator
  } catch(e) {
    if (e.status == 401 ) {
      // Prepare response to user.
      this.status = e.status;
      this.body = 'You don\'t have a signed token dude :(';
    } else {
      throw e; // Pass the error to the next handler since it wasn't a JWT error.
    }
  }
});

// Public endpoint to login.
app.use(function *(next) {
  if (this.url.match(/^\/login/)) {

    let claims = {"username": "bernd"}
    let token = jwt.sign(claims, privateKey, {algorithm: 'RS256'});
    //let claims = yield parse(this);
    this.status = 200;
    this.body = {token: token};
  } else {
    yield next;
  }
});

// Everything behind this will be protected.
app.use(jwt({
  secret: publicKey,
  algorithm: 'RS256'
}));

app.use(function *() {
  this.status = 200;
  console.log(this.statse)
  this.body = 'You are logged in dude! Welcome!';
});

app.listen(3000);
*/
