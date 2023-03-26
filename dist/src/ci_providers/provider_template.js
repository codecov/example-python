"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
/**
 * Detects if this CI provider is being used
 *
 * @param {*} envs an object of enviromental variable key/value pairs
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function detect(envs) {
    return false;
}
exports.detect = detect;
/**
 * Determine the build number, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getBuild(inputs) {
    const { args } = inputs;
    return args.build || '';
}
/**
 * Determine the build URL for use in the Codecov UI
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getBuildURL(inputs) {
    return '';
}
/**
 * Determine the branch of the repository, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getBranch(inputs) {
    const { args } = inputs;
    try {
        return args.branch || '';
    }
    catch (error) {
        throw new Error(`There was an error getting the branch name from git: ${error}`);
    }
}
/**
 * Determine the job number, based on args or envs
 *
 * @param {*} envs an object of enviromental variable key/value pairs
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getJob(envs) {
    return '';
}
/**
 * Determine the PR number, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _getPR(inputs) {
    const { args } = inputs;
    try {
        return args.pr || '';
    }
    catch (error) {
        throw new Error(`There was an error getting the pr number: ${error}`);
    }
}
/**
 * The CI service name that gets sent to the Codecov uploader as part of the query string
 *
 * @returns {string}
 */
function _getService() {
    return '';
}
/**
 * The CI Service name that gets displayed when running the uploader
 *
 * @returns
 */
function getServiceName() {
    return '';
}
exports.getServiceName = getServiceName;
/**
 * Determine the commit SHA that is being uploaded, based on args or envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getSHA(inputs) {
    const { args } = inputs;
    try {
        return args.sha || '';
    }
    catch (error) {
        throw new Error(`There was an error getting the commit SHA from git: ${error}`);
    }
}
/**
 * Determine the slug (org/repo) based on  args or envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getSlug(inputs) {
    const { args } = inputs;
    try {
        return args.slug || '';
    }
    catch (error) {
        throw new Error(`There was an error getting the slug from git: ${error}`);
    }
}
/**
 * Generates and return the serviceParams object
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {{ branch: string, build: string, buildURL: string, commit: string, job: string, pr: string, service: string, slug: string }}
 */
async function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(inputs),
        commit: _getSHA(inputs),
        job: _getJob(inputs.environment),
        pr: _getPR(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
/**
 * Returns all the environment variables used by the provider
 *
 * @returns [{string}]
 */
function getEnvVarNames() {
    return [];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_template.js.map