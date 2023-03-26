"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwiftCoverageFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const fsPromise = __importStar(require("fs/promises"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../helpers/logger");
const util_1 = require("./util");
async function generateSwiftCoverageFiles(project) {
    if (!(0, util_1.isProgramInstalled)('xcrun')) {
        throw new Error('xcrun is not installed, cannot process files');
    }
    (0, logger_1.info)('==> Processing Xcode reports via llvm-cov...');
    const derivedDataDir = `${os_1.default.homedir()}/Library/Developer/Xcode/DerivedData`;
    logger_1.UploadLogger.verbose(`  DerivedData folder: ${derivedDataDir}`);
    if (project == "") {
        (0, logger_1.info)("   hint: Speed up Swift processing by using use -J 'AppName'");
    }
    const profDataFiles = await fast_glob_1.default.sync(['**/*.profdata'], {
        cwd: derivedDataDir,
        absolute: true,
        onlyFiles: true,
    });
    if (profDataFiles.length == 0) {
        (0, logger_1.info)('  -> No swift coverage found.');
    }
    else {
        (0, logger_1.info)(`Found ${profDataFiles.length} profdata files:`);
    }
    for (const profDataFile of profDataFiles) {
        (0, logger_1.info)(`  ${profDataFile}`);
    }
    let outputFiles = [];
    for (const profDataFile of profDataFiles) {
        const projOutputFiles = await convertSwiftFile(profDataFile, project);
        for (const projOutputFile of projOutputFiles) {
            (0, logger_1.info)(`${profDataFile} ${projOutputFile}`);
        }
        outputFiles = outputFiles.concat(projOutputFiles);
    }
    return outputFiles;
}
exports.generateSwiftCoverageFiles = generateSwiftCoverageFiles;
async function convertSwiftFile(profDataFile, project) {
    logger_1.UploadLogger.verbose(`Starting conversion of ${profDataFile}`);
    let dirName = path_1.default.dirname(profDataFile);
    const BUILD = 'Build';
    if (profDataFile.includes(BUILD)) {
        dirName = dirName.substr(0, dirName.indexOf(BUILD) + (BUILD.length));
    }
    const outputFiles = [];
    for (const fileType of ['app', 'framework', 'xctest']) {
        const reportDirs = await fast_glob_1.default.sync([`**/*.${fileType}`], {
            cwd: dirName,
            absolute: true,
            onlyFiles: false
        });
        if (reportDirs.length == 0) {
            continue;
        }
        for (const reportDir of reportDirs) {
            const proj = path_1.default.basename(reportDir, `.${fileType}`);
            if (project != "" && proj != project) {
                logger_1.UploadLogger.verbose(`  Skipping ${proj} as it does not match project ${project}`);
                continue;
            }
            (0, logger_1.info)(`  + Building reports for ${proj} ${fileType}`);
            logger_1.UploadLogger.verbose(`  Reports sourced from ${reportDir}`);
            let dest = path_1.default.join(reportDir, proj);
            if (!fs_1.default.existsSync(dest)) {
                dest = path_1.default.join(reportDir, 'Contents', 'MacOS', proj);
            }
            const outputFile = `${proj.replace(/\s/g, '')}.${fileType}.coverage.txt`;
            try {
                await fsPromise.writeFile(outputFile, (0, util_1.runExternalProgram)('xcrun', ['llvm-cov', 'show', '-instr-profile', profDataFile, dest]));
                (0, logger_1.info)(`  Coverage report written to ${outputFile}`);
                outputFiles.push(outputFile);
            }
            catch (error) {
                (0, logger_1.info)(`  Could not write coverage report to ${outputFile}: ${error}`);
            }
        }
    }
    return outputFiles;
}
//# sourceMappingURL=swift.js.map