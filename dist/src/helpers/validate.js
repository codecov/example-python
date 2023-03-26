"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSHA = exports.validateFlags = exports.isValidFlag = exports.validateURL = exports.validateToken = void 0;
const validator_1 = __importDefault(require("validator"));
/**
 *
 * @param {string} token
 * @returns boolean
 */
function validateToken(token) {
    // TODO: this should be refactored to check against format and length
    return validator_1.default.isAlphanumeric(token) || validator_1.default.isUUID(token);
}
exports.validateToken = validateToken;
function validateURL(url) {
    return validator_1.default.isURL(url, { require_protocol: true });
}
exports.validateURL = validateURL;
function isValidFlag(flag) {
    // eslint-disable-next-line no-useless-escape
    const mask = /^[\w\.\-]{1,45}$/;
    return flag.length === 0 || mask.test(flag);
}
exports.isValidFlag = isValidFlag;
function validateFlags(flags) {
    const invalidFlags = flags.filter(flag => isValidFlag(flag) !== true);
    if (invalidFlags.length > 0) {
        throw new Error(`Flags must consist only of alphanumeric characters, '_', '-', or '.' and not exceed 45 characters. Received ${flags}`);
    }
}
exports.validateFlags = validateFlags;
/**
 * Validate that a SHA is the correct length and content
 * @param {string} commitSHA
 * @param {number} requestedLength
 * @returns {boolean}
 */
const GIT_SHA_LENGTH = 40;
function validateSHA(commitSHA, requestedLength = GIT_SHA_LENGTH) {
    return (commitSHA.length === requestedLength && validator_1.default.isAlphanumeric(commitSHA));
}
exports.validateSHA = validateSHA;
//# sourceMappingURL=validate.js.map