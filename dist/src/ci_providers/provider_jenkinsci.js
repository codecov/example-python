"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
function detect(envs) {
    return Boolean(envs.JENKINS_URL);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BUILD_NUMBER || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    return envs.BUILD_URL ? (envs.BUILD_URL) : '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return (args.branch ||
        envs.ghprbSourceBranch ||
        envs.CHANGE_BRANCH ||
        envs.GIT_BRANCH ||
        envs.BRANCH_NAME ||
        '');
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.ghprbPullId || envs.CHANGE_ID || '';
}
function _getService() {
    return 'jenkins';
}
function getServiceName() {
    return 'Jenkins CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    // Note that the value of GIT_COMMIT may not be accurate if Jenkins
    // is merging `master` in to the working branch first. In these cases
    // there is no envvar representing the actual submitted commit
    return args.sha || envs.ghprbActualCommit || envs.GIT_COMMIT || '';
}
function _getSlug(inputs) {
    const { args } = inputs;
    if (args.slug !== '')
        return args.slug;
    return (0, git_1.parseSlugFromRemoteAddr)('') || '';
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
        'BRANCH_NAME',
        'BUILD_NUMBER',
        'BUILD_URL',
        'CHANGE_ID',
        'GIT_BRANCH',
        'GIT_COMMIT',
        'JENKINS_URL',
        'ghprbActualCommit',
        'ghprbPullId',
        'ghprbSourceBranch',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_jenkinsci.js.map