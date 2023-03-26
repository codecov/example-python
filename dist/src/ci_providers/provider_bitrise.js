"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
function detect(envs) {
    return Boolean(envs.CI) && Boolean(envs.BITRISE_IO);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BITRISE_BUILD_NUMBER || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    return envs.BITRISE_BUILD_URL || '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.BITRISE_GIT_BRANCH || '';
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.BITRISE_PULL_REQUEST || '';
}
function _getService() {
    return 'bitrise';
}
function getServiceName() {
    return 'Bitrise CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.GIT_CLONE_COMMIT_HASH || '';
}
function _getSlug(inputs) {
    const { args } = inputs;
    return args.slug || (0, git_1.parseSlugFromRemoteAddr)('') || '';
}
function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(inputs),
        commit: _getSHA(inputs),
        job: _getJob(),
        pr: _getPR(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
function getEnvVarNames() {
    return [
        'BITRISE_BUILD_NUMBER',
        'BITRISE_BUILD_URL',
        'BITRISE_GIT_BRANCH',
        'BITRISE_IO',
        'BITRISE_PULL_REQUEST',
        'CI',
        'GIT_CLONE_COMMIT_HASH',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_bitrise.js.map