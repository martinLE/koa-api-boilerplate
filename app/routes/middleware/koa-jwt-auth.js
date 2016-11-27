const jwt = require('lib/jwt-auth.js');

exports.authenticateUser = function *(next) {
  try {
    let claim = yield jwt.authenticateUser(this.header.authorization);
    // add user info to state
    this.state = this.state || {};
    this.state.user = claim;
    yield next;
  } catch (e) {
    this.throw(401, JSON.stringify({success: false, msg: e}));
  }
};
