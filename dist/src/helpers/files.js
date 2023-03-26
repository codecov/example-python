"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanCoverageFilePaths = exports.filterFilesAgainstBlockList = exports.getBlocklist = exports.removeFile = exports.getFilePath = exports.fileHeader = exports.fileExists = exports.readCoverageFile = exports.getAllFiles = exports.fetchGitRoot = exports.getCoverageFiles = exports.coverageFilePatterns = exports.manualBlocklist = exports.getFileListing = exports.MARKER_ENV_END = exports.MARKER_FILE_END = exports.MARKER_NETWORK_END = void 0;
const child_process_1 = require("child_process");
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = require("path");
const logger_1 = require("./logger");
const util_1 = require("./util");
const index_js_1 = __importDefault(require("../vendor/micromatch/index.js"));
const constansts_1 = require("./constansts");
exports.MARKER_NETWORK_END = '\n<<<<<< network\n';
exports.MARKER_FILE_END = '<<<<<< EOF\n';
exports.MARKER_ENV_END = '<<<<<< ENV\n';
const globstar = (pattern) => `**/${pattern}`;
/**
 *
 * @param {string} projectRoot
 * @param {Object} args
 * @returns {Promise<string>}
 */
async function getFileListing(projectRoot, args) {
    return getAllFiles(projectRoot, projectRoot, args).join('\n');
}
exports.getFileListing = getFileListing;
function manualBlocklist() {
    // TODO: honor the .gitignore file instead of a hard-coded list
    return [
        '.DS_Store',
        '.circleci',
        '.git',
        '.gitignore',
        '.nvmrc',
        '.nyc_output',
        'bower_components',
        'jspm_packages',
        'node_modules',
        'vendor',
    ];
}
exports.manualBlocklist = manualBlocklist;
function globBlocklist() {
    // TODO: honor the .gitignore file instead of a hard-coded list
    return [
        '__pycache__',
        'node_modules/**/*',
        'vendor',
        '.circleci',
        '.git',
        '.gitignore',
        '.nvmrc',
        '.nyc_output',
        '.tox',
        '*.am',
        '*.bash',
        '*.bat',
        '*.bw',
        '*.cfg',
        '*.class',
        '*.cmake',
        '*.cmake',
        '*.conf',
        '*.coverage',
        '*.cp',
        '*.cpp',
        '*.crt',
        '*.css',
        '*.csv',
        '*.csv',
        '*.data',
        '*.db',
        '*.dox',
        '*.ec',
        '*.ec',
        '*.egg',
        '*.egg-info',
        '*.el',
        '*.env',
        '*.erb',
        '*.exe',
        '*.ftl',
        '*.gif',
        '*.go',
        '*.gradle',
        '*.gz',
        '*.h',
        '*.html',
        '*.in',
        '*.jade',
        '*.jar*',
        '*.jpeg',
        '*.jpg',
        '*.js',
        '*.less',
        '*.log',
        '*.m4',
        '*.mak*',
        '*.map',
        '*.marker',
        '*.md',
        '*.o',
        '*.p12',
        '*.pem',
        '*.png',
        '*.pom*',
        '*.profdata',
        '*.proto',
        '*.ps1',
        '*.pth',
        '*.py',
        '*.pyc',
        '*.pyo',
        '*.rb',
        '*.rsp',
        '*.rst',
        '*.ru',
        '*.sbt',
        '*.scss',
        '*.scss',
        '*.serialized',
        '*.sh',
        '*.snapshot',
        '*.sql',
        '*.svg',
        '*.tar.tz',
        '*.template',
        '*.ts',
        '*.whl',
        '*.xcconfig',
        '*.xcoverage.*',
        '*/classycle/report.xml',
        '*codecov.yml',
        '*~',
        '.*coveragerc',
        '.coverage*',
        'codecov.SHA256SUM',
        'codecov.SHA256SUM.sig',
        'coverage-summary.json',
        'createdFiles.lst',
        'fullLocaleNames.lst',
        'include.lst',
        'inputFiles.lst',
        'phpunit-code-coverage.xml',
        'phpunit-coverage.xml',
        'remapInstanbul.coverage*.json',
        'scoverage.measurements.*',
        'test-result-*-codecoverage.json',
        'test_*_coverage.txt',
        'testrunner-coverage*',
        '*.*js',
        '.yarn',
        '*.zip',
    ];
}
function coverageFilePatterns() {
    return [
        '*coverage*.*',
        'nosetests.xml',
        'jacoco*.xml',
        'clover.xml',
        'report.xml',
        '*.codecov.!(exe)',
        'codecov.!(exe)',
        '*cobertura.xml',
        'excoveralls.json',
        'luacov.report.out',
        'coverage-final.json',
        'naxsi.info',
        'lcov.info',
        'lcov.dat',
        '*.lcov',
        '*.clover',
        'cover.out',
        'gcov.info',
        '*.gcov',
        '*.lst',
        'test_cov.xml',
    ];
}
exports.coverageFilePatterns = coverageFilePatterns;
const EMPTY_STRING = '';
const isNegated = (path) => path.startsWith('!');
/**
 *
 * @param {string} projectRoot
 * @param {string[]} coverageFilePatterns
 * @returns {Promise<string[]>}
 */
async function getCoverageFiles(projectRoot, coverageFilePatterns) {
    const globstar = (pattern) => `**/${pattern}`;
    return (0, fast_glob_1.default)(coverageFilePatterns.map((pattern) => {
        const parts = [];
        if (isNegated(pattern)) {
            parts.push('!');
            parts.push(globstar(pattern.substr(1)));
        }
        else {
            parts.push(globstar(pattern));
        }
        return parts.join(EMPTY_STRING);
    }), {
        cwd: projectRoot,
        dot: true,
        ignore: getBlocklist(),
        suppressErrors: true,
    });
}
exports.getCoverageFiles = getCoverageFiles;
function fetchGitRoot() {
    try {
        return ((0, util_1.runExternalProgram)('git', ['rev-parse', '--show-toplevel'])) || process.cwd();
    }
    catch (error) {
        throw new Error(`Error fetching git root. Please try using the -R flag. ${error}`);
    }
}
exports.fetchGitRoot = fetchGitRoot;
/**
 *
 * @param {string} projectRoot Root of the project
 * @param {string} dirPath Directory to search in
 * @param {Object} args
 * @returns {string[]}
 */
function getAllFiles(projectRoot, dirPath, args) {
    logger_1.UploadLogger.verbose(`Searching for files in ${dirPath}`);
    const { stdout, status, error } = (0, child_process_1.spawnSync)('git', ['-C', dirPath, 'ls-files'], { encoding: 'utf8', maxBuffer: constansts_1.SPAWNPROCESSBUFFERSIZE });
    let files = [];
    if (error instanceof Error || status !== 0) {
        files = fast_glob_1.default
            .sync(['**/*', '**/.[!.]*'], {
            cwd: dirPath,
            ignore: manualBlocklist().map(globstar),
            suppressErrors: true,
        });
    }
    else {
        files = stdout.split(/[\r\n]+/);
    }
    if (args.networkFilter) {
        files = files.filter(file => file.startsWith(String(args.networkFilter)));
    }
    if (args.networkPrefix) {
        files = files.map(file => String(args.networkPrefix) + file);
    }
    return files;
}
exports.getAllFiles = getAllFiles;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
async function readCoverageFile(projectRoot, filePath) {
    return (0, promises_1.readFile)(getFilePath(projectRoot, filePath), {
        encoding: 'utf-8',
    }).catch(err => {
        throw new Error(`There was an error reading the coverage file: ${err}`);
    });
}
exports.readCoverageFile = readCoverageFile;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns boolean
 */
function fileExists(projectRoot, filePath) {
    return fs_1.default.existsSync(getFilePath(projectRoot, filePath));
}
exports.fileExists = fileExists;
/**
 *
 * @param {string} filePath
 * @returns string
 */
function fileHeader(filePath) {
    return `# path=${filePath}\n`;
}
exports.fileHeader = fileHeader;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
function getFilePath(projectRoot, filePath) {
    if (filePath.startsWith('./') ||
        filePath.startsWith('/') ||
        filePath.startsWith('.\\') ||
        filePath.startsWith('.\\')) {
        return filePath;
    }
    if (projectRoot === '.') {
        return path_1.posix.join('.', filePath);
    }
    return path_1.posix.join(projectRoot, filePath);
}
exports.getFilePath = getFilePath;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 */
function removeFile(projectRoot, filePath) {
    fs_1.default.unlink(getFilePath(projectRoot, filePath), err => {
        if (err) {
            (0, logger_1.logError)(`Error removing ${filePath} coverage file`);
        }
    });
}
exports.removeFile = removeFile;
function getBlocklist() {
    return [...manualBlocklist(), ...globBlocklist()].map(globstar);
}
exports.getBlocklist = getBlocklist;
function filterFilesAgainstBlockList(paths, ignoreGlobs) {
    return index_js_1.default.not(paths, ignoreGlobs, { windows: true });
}
exports.filterFilesAgainstBlockList = filterFilesAgainstBlockList;
function cleanCoverageFilePaths(projectRoot, paths) {
    logger_1.UploadLogger.verbose(`Preparing to clean the following coverage paths: ${paths.toString()}`);
    const coverageFilePaths = [...new Set(paths.filter(file => {
            return fileExists(projectRoot, file);
        }))];
    if (coverageFilePaths.length === 0) {
        (0, logger_1.logError)(`None of the following appear to exist as files: ${paths.toString()}`);
        throw new Error('Error while cleaning paths. No paths matched existing files!');
    }
    return coverageFilePaths;
}
exports.cleanCoverageFilePaths = cleanCoverageFilePaths;
//# sourceMappingURL=files.js.map