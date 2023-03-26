"use strict";
/**
 *  We really only need three log levels
 * * Error
 * * Info
 * * Verbose
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadLogger = exports.info = exports.logError = exports.verbose = void 0;
function _getTimestamp() {
    return new Date().toISOString();
}
/**
 *
 * @param {string} message - message to log
 * @param {boolean} shouldVerbose - value of the verbose flag
 * @return void
 */
function verbose(message, shouldVerbose) {
    if (shouldVerbose === true) {
        console.debug(`[${_getTimestamp()}] ['verbose'] ${message}`);
    }
}
exports.verbose = verbose;
/**
 *
 * @param {string} message - message to log
 * @return void
 */
function logError(message) {
    console.error(`[${_getTimestamp()}] ['error'] ${message}`);
}
exports.logError = logError;
/**
 *
 * @param {string} message - message to log
 * @return void
 */
function info(message) {
    console.log(`[${_getTimestamp()}] ['info'] ${message}`);
}
exports.info = info;
class UploadLogger {
    static _instance;
    logLevel = 'info';
    constructor() {
        // Intentionally empty
    }
    static getInstance() {
        if (!UploadLogger._instance) {
            UploadLogger._instance = new UploadLogger();
        }
        return UploadLogger._instance;
    }
    static setLogLevel(level) {
        UploadLogger.getInstance().logLevel = level;
    }
    static verbose(message) {
        verbose(message, UploadLogger.getInstance().logLevel === 'verbose');
    }
}
exports.UploadLogger = UploadLogger;
//# sourceMappingURL=logger.js.map