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
exports.verbose = exports.info = exports.logError = exports.getVersion = exports.generateHeader = exports.main = void 0;
const zlib_1 = __importDefault(require("zlib"));
const package_json_1 = require("../package.json");
const provider_1 = require("./helpers/provider");
const webHelpers = __importStar(require("./helpers/web"));
const logger_1 = require("./helpers/logger");
const token_1 = require("./helpers/token");
const files_1 = require("./helpers/files");
const coveragepy_1 = require("./helpers/coveragepy");
const fixes_1 = require("./helpers/fixes");
const gcov_1 = require("./helpers/gcov");
const swift_1 = require("./helpers/swift");
const xcode_1 = require("./helpers/xcode");
const util_1 = require("./helpers/util");
const checkSlug_1 = require("./helpers/checkSlug");
const validate_1 = require("./helpers/validate");
/**
 *
 * @param {string} uploadHost
 * @param {string} token
 * @param {string} query
 * @param {string} uploadFile
 * @param {string} source
 */
function dryRun(uploadHost, token, query, uploadFile, source) {
    (0, logger_1.info)('==> Dumping upload file (no upload)');
    (0, logger_1.info)(`${uploadHost}/upload/v4?package=${webHelpers.getPackage(source)}&token=${token}&${query}`);
    (0, logger_1.info)(uploadFile);
}
/**
 *
 * @param {Object} args
 * @param {string} args.build Specify the build number manually
 * @param {string} args.branch Specify the branch manually
 * @param {string} args.dir Directory to search for coverage reports.
 * @param {string} args.env Specify environment variables to be included with this build
 * @param {string} args.sha Specify the commit SHA manually
 * @param {string} args.file Target file(s) to upload
 * @param {string} args.flags Flag the upload to group coverage metrics
 * @param {string} args.name Custom defined name of the upload. Visible in Codecov UI
 * @param {string} args.networkFilter Specify a filter on the files listed in the network section of the Codecov report. Useful for upload-specific path fixing
 * @param {string} args.networkPrefix Specify a prefix on files listed in the network section of the Codecov report. Useful to help resolve path fixing
 * @param {string} args.parent The commit SHA of the parent for which you are uploading coverage.
 * @param {string} args.pr Specify the pull request number manually
 * @param {string} args.token Codecov upload token
 * @param {string} args.tag Specify the git tag
 * @param {boolean} args.swift Specify whether to use swift conversion
 * @param {string} args.swiftProject Specific swift project to convert
 * @param {boolean} args.verbose Run with verbose logging
 * @param {string} args.rootDir Specify the project root directory when not in a git repo
 * @param {boolean} args.nonZero Should errors exit with a non-zero (default: false)
 * @param {boolean} args.dryRun Don't upload files to Codecov
 * @param {string} args.slug Specify the slug manually
 * @param {string} args.url Change the upload host (Enterprise use)
 * @param {boolean} args.clean Move discovered coverage reports to the trash
 * @param {string} args.feature Toggle features
 * @param {string} args.source Track wrappers of the uploader
 */
async function main(args) {
    if (args.verbose) {
        logger_1.UploadLogger.setLogLevel('verbose');
    }
    // Did user asking for changelog?
    if (args.changelog) {
        webHelpers.displayChangelog();
        return;
    }
    /*
    Step 1: validate and sanitize inputs
    Step 2: detect if we are in a git repo
    Step 3: sanitize and set token
    Step 4: get network (file listing)
    Step 5: select coverage files (search or specify)
    Step 6: generate upload file
    Step 7: determine CI provider
    Step 8: either upload or dry-run
    */
    // #region == Step 1: validate and sanitize inputs
    // TODO: clean and sanitize envs and args
    const envs = process.env;
    // args
    const inputs = { args, environment: envs };
    let uploadHost;
    if (args.url) {
        uploadHost = args.url;
    }
    else {
        uploadHost = 'https://codecov.io';
    }
    (0, logger_1.info)(generateHeader(getVersion()));
    let flags;
    if (typeof args.flags === 'object') {
        flags = [...args.flags];
    }
    else {
        flags = String(args.flags || '').split(',');
    }
    (0, validate_1.validateFlags)(flags);
    // #endregion
    // #region == Step 2: detect if we are in a git repo
    const projectRoot = args.rootDir || (0, files_1.fetchGitRoot)();
    if (projectRoot === '') {
        (0, logger_1.info)('=> No git repo detected. Please use the -R flag if the below detected directory is not correct.');
    }
    (0, logger_1.info)(`=> Project root located at: ${projectRoot}`);
    // #endregion
    // #region == Step 3: sanitize and set token
    const token = await (0, token_1.getToken)(inputs, projectRoot);
    if (token === '') {
        (0, logger_1.info)('-> No token specified or token is empty');
    }
    // #endregion
    // #region == Step 4: get network
    const uploadFileChunks = [];
    if (!args.feature || args.feature.split(',').includes('network') === false) {
        logger_1.UploadLogger.verbose('Start of network processing...');
        let fileListing = '';
        try {
            fileListing = await (0, files_1.getFileListing)(projectRoot, args);
        }
        catch (error) {
            throw new Error(`Error getting file listing: ${error}`);
        }
        uploadFileChunks.push(Buffer.from(fileListing));
        uploadFileChunks.push(Buffer.from(files_1.MARKER_NETWORK_END));
    }
    // #endregion
    // #region == Step 5: select coverage files (search or specify)
    let requestedPaths = [];
    // Look for files
    if (args.gcov) {
        const gcovInclude = (0, util_1.argAsArray)(args.gcovInclude);
        const gcovIgnore = (0, util_1.argAsArray)(args.gcovIgnore);
        const gcovArgs = (0, util_1.argAsArray)(args.gcovArgs);
        const gcovExecutable = args.gcovExecutable || 'gcov';
        logger_1.UploadLogger.verbose(`Running ${gcovExecutable}...`);
        const gcovLogs = await (0, gcov_1.generateGcovCoverageFiles)(projectRoot, gcovInclude, gcovIgnore, gcovArgs, gcovExecutable);
        logger_1.UploadLogger.verbose(`${gcovLogs}`);
    }
    if (args.swift) {
        await (0, swift_1.generateSwiftCoverageFiles)(args.swiftProject || '');
    }
    if (args.xcode) {
        if (!args.xcodeArchivePath) {
            throw new Error('Please specify xcodeArchivePath to run the Codecov uploader with xcode support');
        }
        else {
            const xcodeArchivePath = args.xcodeArchivePath;
            const xcodeLogs = await (0, xcode_1.generateXcodeCoverageFiles)(xcodeArchivePath);
            logger_1.UploadLogger.verbose(`${xcodeLogs}`);
        }
    }
    let coverageFilePaths = [];
    if (args.file !== undefined) {
        if (typeof args.file === 'string') {
            requestedPaths = args.file.split(',');
        }
        else {
            requestedPaths = args.file; // Already an array
        }
        requestedPaths = requestedPaths.filter((path) => {
            return Boolean(path) || (0, logger_1.info)('Warning: Skipping an empty path passed to `-f`');
        });
    }
    try {
        const coveragePyLogs = await (0, coveragepy_1.generateCoveragePyFile)(projectRoot, requestedPaths);
        logger_1.UploadLogger.verbose(`${coveragePyLogs}`);
    }
    catch (error) {
        logger_1.UploadLogger.verbose(`Skipping coveragepy conversion: ${error}`);
    }
    coverageFilePaths = requestedPaths;
    if (!args.feature || args.feature.split(',').includes('search') === false) {
        (0, logger_1.info)('Searching for coverage files...');
        const isNegated = (path) => path.startsWith('!');
        coverageFilePaths = coverageFilePaths.concat(await (0, files_1.getCoverageFiles)(args.dir || projectRoot, (() => {
            const numOfNegatedPaths = coverageFilePaths.filter(isNegated).length;
            if (coverageFilePaths.length > numOfNegatedPaths) {
                return coverageFilePaths;
            }
            else {
                return coverageFilePaths.concat((0, files_1.coverageFilePatterns)());
            }
        })()));
        // Generate what the file listing would be after the blocklist is applied
        let coverageFilePathsAfterFilter = coverageFilePaths;
        if (coverageFilePaths.length > 0) {
            coverageFilePathsAfterFilter = (0, files_1.filterFilesAgainstBlockList)(coverageFilePaths, (0, files_1.getBlocklist)());
        }
        // If args.file was passed, emit warning for 'filtered' filess
        if (requestedPaths.length > 0) {
            if (coverageFilePathsAfterFilter.length !== requestedPaths.length) {
                (0, logger_1.info)('Warning: Some files passed via the -f flag would normally be excluded from search.');
                (0, logger_1.info)('If Codecov encounters issues processing your reports, please review https://docs.codecov.com/docs/supported-report-formats');
            }
        }
        else {
            // Overwrite coverageFilePaths with coverageFilePathsAfterFilter
            (0, logger_1.info)('Warning: Some files located via search were excluded from upload.');
            (0, logger_1.info)('If Codecov did not locate your files, please review https://docs.codecov.com/docs/supported-report-formats');
            coverageFilePaths = coverageFilePathsAfterFilter;
        }
    }
    let coverageFilePathsThatExist = [];
    if (coverageFilePaths.length > 0) {
        coverageFilePathsThatExist = (0, files_1.cleanCoverageFilePaths)(args.dir || projectRoot, coverageFilePaths);
    }
    if (coverageFilePathsThatExist.length > 0) {
        (0, logger_1.info)(`=> Found ${coverageFilePathsThatExist.length} possible coverage files:\n  ` +
            coverageFilePathsThatExist.join('\n  '));
    }
    else {
        const noFilesError = args.file ?
            'No coverage files found, exiting.' :
            'No coverage files located, please try use `-f`, or change the project root with `-R`';
        throw new Error(noFilesError);
    }
    logger_1.UploadLogger.verbose('End of network processing');
    // #endregion
    // #region == Step 6: generate upload file
    // TODO: capture envs
    // Get coverage report contents
    let coverageFileAdded = false;
    for (const coverageFile of coverageFilePathsThatExist) {
        let fileContents;
        try {
            (0, logger_1.info)(`Processing ${(0, files_1.getFilePath)(args.dir || projectRoot, coverageFile)}...`),
                (fileContents = await (0, files_1.readCoverageFile)(args.dir || projectRoot, coverageFile));
        }
        catch (err) {
            (0, logger_1.info)(`Could not read coverage file (${coverageFile}): ${err}`);
            continue;
        }
        uploadFileChunks.push(Buffer.from((0, files_1.fileHeader)(coverageFile)));
        uploadFileChunks.push(Buffer.from(fileContents));
        uploadFileChunks.push(Buffer.from(files_1.MARKER_FILE_END));
        coverageFileAdded = true;
    }
    if (!coverageFileAdded) {
        throw new Error('No coverage files could be found to upload, exiting.');
    }
    // Cleanup
    if (args.clean) {
        for (const coverageFile of coverageFilePathsThatExist) {
            (0, files_1.removeFile)(args.dir || projectRoot, coverageFile);
        }
    }
    // Environment variables
    if (args.env || envs.CODECOV_ENV) {
        const environmentVars = args.env || envs.CODECOV_ENV || '';
        const vars = environmentVars
            .split(',')
            .filter(Boolean)
            .map(evar => `${evar}=${process.env[evar] || ''}\n`)
            .join('');
        uploadFileChunks.push(Buffer.from(vars));
        uploadFileChunks.push(Buffer.from(files_1.MARKER_ENV_END));
    }
    // Fixes
    if (args.feature && args.feature.split(',').includes('fixes') === true) {
        (0, logger_1.info)('Generating file fixes...');
        const fixes = await (0, fixes_1.generateFixes)(projectRoot);
        uploadFileChunks.push(Buffer.from(fixes_1.FIXES_HEADER));
        uploadFileChunks.push(Buffer.from(fixes));
        uploadFileChunks.push(Buffer.from(files_1.MARKER_FILE_END));
        (0, logger_1.info)('Finished generating file fixes');
    }
    const uploadFile = Buffer.concat(uploadFileChunks);
    const gzippedFile = zlib_1.default.gzipSync(uploadFile);
    // #endregion
    // #region == Step 7: determine CI provider
    const hasToken = token !== '';
    const serviceParams = (0, provider_1.detectProvider)(inputs, hasToken);
    // #endregion
    // #region == Step 8: either upload or dry-run
    const buildParams = webHelpers.populateBuildParams(inputs, serviceParams);
    logger_1.UploadLogger.verbose('Using the following upload parameters:');
    for (const parameter in buildParams) {
        logger_1.UploadLogger.verbose(`${parameter}`);
    }
    if (!hasToken) {
        if (!buildParams.slug) {
            throw new Error('Slug must be set if a token is not passed. Consider passing a slug via `-r`');
        }
        else {
            const validSlug = (0, checkSlug_1.checkSlug)(buildParams.slug);
            if (!validSlug) {
                throw new Error(`Slug must follow the format of "<owner>/<repo>". We detected "${buildParams.slug}"`);
            }
        }
    }
    const query = webHelpers.generateQuery(buildParams);
    if (args.dryRun) {
        dryRun(uploadHost, token, query, uploadFile.toString(), args.source || '');
        return;
    }
    (0, logger_1.info)(`Pinging Codecov: ${uploadHost}/upload/v4?package=${webHelpers.getPackage(args.source || '')}&token=*******&${query}`);
    logger_1.UploadLogger.verbose(`Passed token was ${token.length} characters long`);
    try {
        logger_1.UploadLogger.verbose(`${uploadHost}/upload/v4?package=${webHelpers.getPackage(args.source || '')}&${query}
        Content-Type: 'text/plain'
        Content-Encoding: 'gzip'
        X-Reduced-Redundancy: 'false'`);
        const postURL = new URL(uploadHost);
        const putAndResultUrlPair = await webHelpers.uploadToCodecovPOST(postURL, token, query, args.source || '', args);
        const postResults = webHelpers.parsePOSTResults(putAndResultUrlPair);
        logger_1.UploadLogger.verbose(`Returned upload url: ${postResults.putURL}`);
        const statusAndResultPair = await webHelpers.uploadToCodecovPUT(postResults, gzippedFile, args);
        (0, logger_1.info)(JSON.stringify(statusAndResultPair));
        return { resultURL: statusAndResultPair.resultURL.href, status: statusAndResultPair.status };
    }
    catch (error) {
        throw new Error(`Error uploading to ${uploadHost}: ${error}`);
    }
    // #endregion
}
exports.main = main;
/**
 *
 * @param {string} version
 * @returns {string}
 */
function generateHeader(version) {
    return `
     _____          _
    / ____|        | |
   | |     ___   __| | ___  ___ _____   __
   | |    / _ \\ / _\` |/ _ \\/ __/ _ \\ \\ / /
   | |___| (_) | (_| |  __/ (_| (_) \\ V /
    \\_____\\___/ \\__,_|\\___|\\___\\___/ \\_/

  Codecov report uploader ${version}`;
}
exports.generateHeader = generateHeader;
function getVersion() {
    return package_json_1.version;
}
exports.getVersion = getVersion;
var logger_2 = require("./helpers/logger");
Object.defineProperty(exports, "logError", { enumerable: true, get: function () { return logger_2.logError; } });
Object.defineProperty(exports, "info", { enumerable: true, get: function () { return logger_2.info; } });
Object.defineProperty(exports, "verbose", { enumerable: true, get: function () { return logger_2.verbose; } });
//# sourceMappingURL=index.js.map