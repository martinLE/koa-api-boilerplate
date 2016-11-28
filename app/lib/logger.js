/**
 * configures the Winston Logger to log everything to stdout and
 * everything > debug to a logfile
 */

const winston = require('winston');
// const common = require('./common');

// in dev, only log to stdout, in any other case log to filename
let transports = [];
/*switch(common.getEnv()) {
  case 'development':
    transports.push(new (winston.transports.Console)({ level: 'debug', colorize: true, prettyPrint: true }));
    break;
  default:
    transports.push(new (winston.transports.File)({ filename: common.getBasePath()+'/log/app.log', level: 'info' }));
}
*/

// always log to stdout
transports.push(new (winston.transports.Console)({ level: 'debug', colorize: true, prettyPrint: true }));

const logger = new (winston.Logger)({
  transports: transports
});

module.exports = logger;
