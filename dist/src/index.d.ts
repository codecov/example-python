import { UploaderArgs } from './types';
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
export declare function main(args: UploaderArgs): Promise<void | Record<string, unknown>>;
/**
 *
 * @param {string} version
 * @returns {string}
 */
export declare function generateHeader(version: string): string;
export declare function getVersion(): string;
export { logError, info, verbose } from './helpers/logger';
