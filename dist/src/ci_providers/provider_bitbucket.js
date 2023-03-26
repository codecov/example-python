"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const util_1 = require("../helpers/util");
const validate_1 = require("../helpers/validate");
function detect(envs) {
    return Boolean(envs.CI) && Boolean(envs.BITBUCKET_BUILD_NUMBER);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BITBUCKET_BUILD_NUMBER || '';
}
function _getBuildURL() {
    // TODO: https://github.com/codecov/uploader/issues/267
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.BITBUCKET_BRANCH || '';
}
function _getJob(envs) {
    return envs.BITBUCKET_BUILD_NUMBER || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.BITBUCKET_PR_ID || '';
}
function _getService() {
    return 'bitbucket';
}
function getServiceName() {
    return 'Bitbucket';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    let commit = envs.BITBUCKET_COMMIT || '';
    if (commit && (0, validate_1.validateSHA)(commit, 12)) {
        commit = (0, util_1.runExternalProgram)('git', ['rev-parse', commit]);
    }
    return args.sha || commit || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.BITBUCKET_REPO_FULL_NAME || '';
}
function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(),
        commit: _getSHA(inputs),
        job: _getJob(inputs.environment),
        pr: _getPR(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
function getEnvVarNames() {
    return ['CI', 'BITBUCKET_BUILD_NUMBER'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_bitbucket.js.map