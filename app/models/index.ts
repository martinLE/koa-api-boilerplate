const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('config');
const logger    = require('lib/logger');

const sequelize = new Sequelize(config.db.connectionString, {
  define: {
    underscored: true, // created_at instead of createdAt
    freezeTableName: true, // keep table names singular,
    paranoid: true,
    classMethods: {

    },
    instanceMethods: {
    }
  },
  logging: function(str) {
    logger.debug(str);
  }
});

const db = <any>{};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.ts');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    // TODO: Put underscore to camelcase in common or so
    db[model.name.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); })] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// prepare an error message for the API, based on what detailes are delivery by Sequelize
db.parseError = function(err) {
  return (typeof err.errors !== 'undefined' && err.errors.length > 0) ? err.errors[0].message : err.message;
};

export default db;
