"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGcovCoverageFiles = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const files_1 = require("../../src/helpers/files");
const util_1 = require("./util");
async function generateGcovCoverageFiles(projectRoot, include = [], ignore = [], gcovArgs = [], gcovExecutable = 'gcov') {
    if (!(0, util_1.isProgramInstalled)(gcovExecutable)) {
        throw new Error(`${gcovExecutable} is not installed, cannot process files`);
    }
    const globstar = (pattern) => `**/${pattern}`;
    const gcovInclude = ['*.gcno', ...include].map(globstar);
    const gcovIgnore = [...(0, files_1.manualBlocklist)(), ...ignore].map(globstar);
    const files = await (0, fast_glob_1.default)(gcovInclude, { cwd: projectRoot, dot: true, ignore: gcovIgnore, onlyFiles: true });
    if (!files.length) {
        throw new Error('No gcov files found');
    }
    if (gcovExecutable === 'gcov') {
        gcovArgs.unshift('-pb');
    }
    return (0, util_1.runExternalProgram)(gcovExecutable, [...gcovArgs, ...files]);
}
exports.generateGcovCoverageFiles = generateGcovCoverageFiles;
//# sourceMappingURL=gcov.js.map