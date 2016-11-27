'use strict'

// node bin/add-api-user.js --username alpha

const argv    = require('yargs').argv;
const db      = require('models');
const jwt     = require('lib/jwt-auth');

//TODO: add salt to claim, not only ID
//TODO: make username unique

// create DB user
 db.apiUser.create({username: argv.username})
    .then(function(user, created){
      let token = jwt.sign({api_user_id: user.id });
      console.log({token: token});
    })
    .catch(function(err){
      console.log(db.parseError(err));
    });

