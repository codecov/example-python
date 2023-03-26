"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
function detect(envs) {
    return Boolean(envs.TEAMCITY_VERSION);
}
exports.detect = detect;
function _getBuildURL() {
    return '';
}
// This is the value that gets passed to the Codecov uploader
function _getService() {
    return 'teamcity';
}
// This is the name that gets printed
function getServiceName() {
    return 'TeamCity';
}
exports.getServiceName = getServiceName;
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.BRANCH_NAME || '';
}
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.BUILD_VCS_NUMBER || '';
}
function _getSlug(inputs) {
    const { args } = inputs;
    if (args.slug !== '')
        return args.slug;
    return (0, git_1.parseSlugFromRemoteAddr)('') || '';
}
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BUILD_NUMBER || '';
}
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
function _getJob() {
    return '';
}
function getServiceParams(inputs) {
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
    return ['TEAMCITY_VERSION'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_teamcity.js.map