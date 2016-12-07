const jwt = require('lib/jwt-auth');

exports.authenticateUser = async(ctx, next) => {
  try {
    let claim = await jwt.authenticateUser(ctx.header.authorization);
    // add user info to state
    ctx.state = ctx.state || {};
    ctx.state.user = claim;
  } catch (e) {
    ctx.throw(401, e);
  }
  await next();
};
