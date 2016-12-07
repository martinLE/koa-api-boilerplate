/**
 * configures the Winston Logger to log everything to stdout and
 * everything > debug to a logfile
 */

const winst = require('winston');
const common = require('./common');

// in dev, only log to stdout, in any other case log to filename
let transports = [];
switch(common.getEnv()) {
  case 'test':
    transports.push(new (winst.transports.File)({ filename: __dirname+'/../../log/app.log', level: 'debug' }));
    break;
  default:
    transports.push(new (winst.transports.Console)({ level: 'debug', colorize: true, prettyPrint: true }));
}

const logger = new (winst.Logger)({
  transports: transports
});

module.exports = logger;
