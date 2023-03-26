"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
function detect(envs) {
    return Boolean(envs.GITLAB_CI);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.CI_BUILD_ID || envs.CI_JOB_ID || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.CI_BUILD_REF_NAME || envs.CI_COMMIT_REF_NAME || '';
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
function _getService() {
    return 'gitlab';
}
function getServiceName() {
    return 'GitLab CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.CI_MERGE_REQUEST_SOURCE_BRANCH_SHA || envs.CI_BUILD_REF || envs.CI_COMMIT_SHA || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    const remoteAddr = envs.CI_BUILD_REPO || envs.CI_REPOSITORY_URL || '';
    return (envs.CI_PROJECT_PATH ||
        (0, git_1.parseSlugFromRemoteAddr)(remoteAddr) ||
        '');
}
async function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(),
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
        'CI_BUILD_ID',
        'CI_BUILD_REF',
        'CI_BUILD_REF_NAME',
        'CI_BUILD_REPO',
        'CI_COMMIT_REF_NAME',
        'CI_COMMIT_SHA',
        'CI_JOB_ID',
        'CI_MERGE_REQUEST_SOURCE_BRANCH_SHA',
        'CI_PROJECT_PATH',
        'CI_REPOSITORY_URL',
        'GITLAB_CI',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_gitlabci.js.map