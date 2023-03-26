/**
 *  We really only need three log levels
 * * Error
 * * Info
 * * Verbose
 */
/**
 *
 * @param {string} message - message to log
 * @param {boolean} shouldVerbose - value of the verbose flag
 * @return void
 */
export declare function verbose(message: string, shouldVerbose: boolean): void;
/**
 *
 * @param {string} message - message to log
 * @return void
 */
export declare function logError(message: string): void;
/**
 *
 * @param {string} message - message to log
 * @return void
 */
export declare function info(message: string): void;
export declare class UploadLogger {
    private static _instance;
    logLevel: string;
    private constructor();
    static getInstance(): UploadLogger;
    static setLogLevel(level: string): void;
    static verbose(message: string): void;
}
