"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports._getService = exports.detect = void 0;
const provider_1 = require("../helpers/provider");
/**
 * Detects if this CI provider is being used
 *
 * @param {*} envs an object of enviromental variable key/value pairs
 * @returns boolean
 */
function detect(envs) {
    return Boolean(envs.BUILDKITE);
}
exports.detect = detect;
/**
 * Determine the build number, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BUILDKITE_BUILD_NUMBER || '';
}
/**
 * Determine the build URL for use in the Codecov UI
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getBuildURL(inputs) {
    return inputs.environment.BUILDKITE_BUILD_URL || '';
}
/**
 * Determine the branch of the repository, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.BUILDKITE_BRANCH || '';
}
/**
 * Determine the job number, based on args or envs
 *
 * @param {*} envs an object of enviromental variable key/value pairs
 * @returns {string}
 */
function _getJob(envs) {
    return envs.BUILDKITE_JOB_ID || '';
}
/**
 * Determine the PR number, based on args and envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
/**
 * The CI service name that gets sent to the Codecov uploader as part of the query string
 *
 * @returns {string}
 */
function _getService() {
    return 'buildkite';
}
exports._getService = _getService;
/**
 * The CI Service name that gets displayed when running the uploader
 *
 * @returns
 */
function getServiceName() {
    return 'Buildkite';
}
exports.getServiceName = getServiceName;
/**
 * Determine the commit SHA that is being uploaded, based on args or envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    if (Boolean(args.sha) || Boolean(envs.BUILDKITE_COMMIT)) {
        return args.sha || envs.BUILDKITE_COMMIT || '';
    }
    throw new Error('Unable to detect sha, please set manually with the -C flag');
}
/**
 * Determine the slug (org/repo) based on  args or envs
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {string}
 */
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    return (0, provider_1.setSlug)(args.slug, envs.BUILDKITE_ORGANIZATION_SLUG, envs.BUILDKITE_PIPELINE_SLUG);
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
function getEnvVarNames() {
    return [
        'BUILDKITE',
        'BUILDKITE_BRANCH',
        'BUILDKITE_BUILD_NUMBER',
        'BUILDKITE_BUILD_URL',
        'BUILDKITE_COMMIT',
        'BUILDKITE_JOB_ID',
        'BUILDKITE_PROJECT_SLUG',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_buildkite.js.map