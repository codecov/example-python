"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argAsArray = exports.isSetAndNotEmpty = exports.runExternalProgram = exports.isProgramInstalled = exports.SPAWNPROCESSBUFFERSIZE = void 0;
const child_process_1 = __importDefault(require("child_process"));
const constansts_1 = require("./constansts");
var constansts_2 = require("./constansts");
Object.defineProperty(exports, "SPAWNPROCESSBUFFERSIZE", { enumerable: true, get: function () { return constansts_2.SPAWNPROCESSBUFFERSIZE; } });
function isProgramInstalled(programName) {
    return !child_process_1.default.spawnSync(programName).error;
}
exports.isProgramInstalled = isProgramInstalled;
function runExternalProgram(programName, optionalArguments = []) {
    const result = child_process_1.default.spawnSync(programName, optionalArguments, { maxBuffer: constansts_1.SPAWNPROCESSBUFFERSIZE });
    if (result.error) {
        throw new Error(`Error running external program: ${result.error}`);
    }
    return result.stdout.toString().trim();
}
exports.runExternalProgram = runExternalProgram;
function isSetAndNotEmpty(val) {
    return typeof val !== 'undefined' && val !== '';
}
exports.isSetAndNotEmpty = isSetAndNotEmpty;
function argAsArray(args) {
    const result = [];
    if (typeof args === "undefined") {
        return result;
    }
    return result.concat(args);
}
exports.argAsArray = argAsArray;
//# sourceMappingURL=util.js.map