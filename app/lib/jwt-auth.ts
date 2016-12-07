/**
 * This module is an abstraction for commonly used functions with jsonwebtoken
 * It's based on koa-jwt, but modified for our needs and w/o the koa part
 * (This is located in routes/middleware/koa-jwt-auth for better Separation of Concerns)
 */

const thunkify  = require('thunkify');
const _JWT      = require('jsonwebtoken');
const fs        = require('fs');
const config    = require('config');
import db from 'models';

// Make verify function play nice with co/koa
const JWT = {decode: _JWT.decode, sign: _JWT.sign, verify: _JWT.verify};
const publicKeyFile  = __dirname + '/../../config/' + config.jwt.publicKeyFile;
const privateKeyFile = __dirname + '../../config/' + config.jwt.privateKeyFile;
const opts = { algorithm: 'RS256' };

exports.authenticateUser = async(authHeader) => {

  let token, parts, scheme, credentials;
  const secret = fs.readFileSync(publicKeyFile);

  // check if auth header is set
  if (authHeader) {
    parts = authHeader.split(' ');
    if (parts.length == 2) {
      scheme = parts[0];
      credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      throw('Bad Authorization header format. Format is "Authorization: Bearer <token>"');
    }
  } else {
    throw('No Authorization header found');
  }

  // validate auth header
  try {
    let claim = await JWT.verify(token, secret, opts);
    // check, if user is valid
    let user = await db.apiUser.findById(claim.api_user_id);
    if(!user) throw ('Invalid user');
    return claim;
  } catch(e) {
    throw('Invalid token');
  }
};

// create token based on given claim
module.exports.sign = function(claim) {
  return _JWT.sign(claim, fs.readFileSync(privateKeyFile), opts);
};

module.exports.verify = _JWT.verify;
module.exports.decode = _JWT.decode;
