"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCoveragePyFile = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const util_1 = require("./util");
const logger_1 = require("./logger");
async function generateCoveragePyFile(projectRoot, overrideFiles) {
    if (!(0, util_1.isProgramInstalled)('coverage')) {
        return 'coveragepy is not installed';
    }
    if (overrideFiles.length > 0) {
        return `Skipping coveragepy, files already specified`;
    }
    const dotCoverage = await (0, fast_glob_1.default)(['.coverage', '.coverage.*'], { cwd: projectRoot, dot: true, onlyFiles: true });
    if (dotCoverage.length == 0) {
        return 'Skipping coveragepy, no .coverage file found.';
    }
    (0, logger_1.info)('Running coverage xml...');
    return (0, util_1.runExternalProgram)('coverage', ['xml']);
}
exports.generateCoveragePyFile = generateCoveragePyFile;
//# sourceMappingURL=coveragepy.js.map