/**
 * Collection of small functions that are not related to any topic
 */


exports.getEnv = function() {
  return process.env.NODE_ENV || 'development';
};

// return root dir of application
exports.getBasePath = function() {
  const path = require('path');
  return path.dirname(require.main.filename);
};
