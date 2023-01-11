//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../loggers/log4js.loggers')
//____________________________________________________________________________________________________ //

const loggerMiddleware = function(req, _res, next) {
    logger.info(`[${req.method}] ${req.originalUrl}`)
    next();
}

module.exports = {loggerMiddleware};