"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
function detect(envs) {
    return envs.CI === 'woodpecker';
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.CI_BUILD_NUMBER || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    return envs.CI_BUILD_LINK || '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.CI_COMMIT_SOURCE_BRANCH || envs.CI_COMMIT_BRANCH || '';
}
function _getJob(inputs) {
    const { environment: envs } = inputs;
    return envs.CI_JOB_NUMBER || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.CI_COMMIT_PULL_REQUEST || '';
}
function _getService() {
    return 'woodpecker';
}
function getServiceName() {
    return 'Woodpecker CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.CI_COMMIT_SHA || '';
}
function _getTag(inputs) {
    const { args, environment: envs } = inputs;
    return args.tag || envs.CI_COMMIT_TAG || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.CI_REPO || '';
}
async function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(inputs),
        commit: _getSHA(inputs),
        tag: _getTag(inputs),
        pr: _getPR(inputs),
        job: _getJob(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
function getEnvVarNames() {
    return [
        'CI',
        'CI_BUILD_NUMBER',
        'CI_BUILD_LINK',
        'CI_COMMIT_SOURCE_BRANCH',
        'CI_COMMIT_BRANCH',
        'CI_JOB_NUMBER',
        'CI_COMMIT_PULL_REQUEST',
        'CI_COMMIT_SHA',
        'CI_COMMIT_TAG',
        'CI_REPO',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_woodpecker.js.map