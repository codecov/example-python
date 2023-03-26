"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateXcodeCoverageFiles = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const logger_1 = require("../helpers/logger");
const util_1 = require("./util");
async function generateXcodeCoverageFiles(archivePath) {
    if (!(0, util_1.isProgramInstalled)('xcrun')) {
        throw new Error('xcrun is not installed, cannot process files');
    }
    (0, logger_1.info)('Running xcode coversion...');
    const coverage = {};
    const report = { coverage: coverage };
    getFileList(archivePath).forEach(repoFilePath => {
        logger_1.UploadLogger.verbose(`Converting ${repoFilePath}...`);
        const coverageInfo = getCoverageInfo(archivePath, repoFilePath);
        const coverageJson = convertCoverage(coverageInfo);
        report.coverage[repoFilePath] = coverageJson;
    });
    let pathFilename = archivePath.split('/').pop();
    if (pathFilename) {
        pathFilename = pathFilename.split('.xcresult')[0];
    }
    const filename = `./coverage-report-${pathFilename}.json`;
    logger_1.UploadLogger.verbose(`Writing coverage to ${filename}`);
    await promises_1.default.writeFile(filename, JSON.stringify(report));
    return filename;
}
exports.generateXcodeCoverageFiles = generateXcodeCoverageFiles;
function getFileList(archivePath) {
    const fileList = (0, util_1.runExternalProgram)('xcrun', ['xccov', 'view', '--file-list', '--archive', archivePath]);
    return fileList.split('\n').filter(i => i !== '');
}
function getCoverageInfo(archivePath, filePath) {
    return (0, util_1.runExternalProgram)('xcrun', ['xccov', 'view', '--archive', archivePath, '--file', filePath]);
}
function convertCoverage(coverageInfo) {
    const coverageInfoArr = coverageInfo.split('\n');
    const obj = {};
    coverageInfoArr.forEach(line => {
        const [lineNum, lineInfo] = line.split(':');
        if (lineNum && Number.isInteger(Number(lineNum))) {
            const lineHits = lineInfo?.trimStart().split(' ')[0]?.trim();
            if (typeof lineHits !== 'string') {
                return;
            }
            if (lineHits === '*') {
                obj[String(lineNum.trim())] = null;
            }
            else {
                obj[String(lineNum.trim())] = lineHits;
            }
        }
    });
    return obj;
}
//# sourceMappingURL=xcode.js.map