import { UploaderArgs } from '../types';
export declare const MARKER_NETWORK_END = "\n<<<<<< network\n";
export declare const MARKER_FILE_END = "<<<<<< EOF\n";
export declare const MARKER_ENV_END = "<<<<<< ENV\n";
/**
 *
 * @param {string} projectRoot
 * @param {Object} args
 * @returns {Promise<string>}
 */
export declare function getFileListing(projectRoot: string, args: UploaderArgs): Promise<string>;
export declare function manualBlocklist(): string[];
export declare function coverageFilePatterns(): string[];
/**
 *
 * @param {string} projectRoot
 * @param {string[]} coverageFilePatterns
 * @returns {Promise<string[]>}
 */
export declare function getCoverageFiles(projectRoot: string, coverageFilePatterns: string[]): Promise<string[]>;
export declare function fetchGitRoot(): string;
/**
 *
 * @param {string} projectRoot Root of the project
 * @param {string} dirPath Directory to search in
 * @param {Object} args
 * @returns {string[]}
 */
export declare function getAllFiles(projectRoot: string, dirPath: string, args: UploaderArgs): string[];
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
export declare function readCoverageFile(projectRoot: string, filePath: string): Promise<string>;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns boolean
 */
export declare function fileExists(projectRoot: string, filePath: string): boolean;
/**
 *
 * @param {string} filePath
 * @returns string
 */
export declare function fileHeader(filePath: string): string;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
export declare function getFilePath(projectRoot: string, filePath: string): string;
/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 */
export declare function removeFile(projectRoot: string, filePath: string): void;
export declare function getBlocklist(): string[];
export declare function filterFilesAgainstBlockList(paths: string[], ignoreGlobs: string[]): string[];
export declare function cleanCoverageFilePaths(projectRoot: string, paths: string[]): string[];
