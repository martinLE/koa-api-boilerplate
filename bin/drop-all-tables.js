'use strict'

const db      = require('models');

db.sequelize.queryInterface.dropAllTables().then(function() {
  console.log('Deleted all tables');
});
