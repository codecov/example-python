"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
function detect(envs) {
    return Boolean(envs.CI) && Boolean(envs.HEROKU_TEST_RUN_BRANCH);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.HEROKU_TEST_RUN_ID || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.HEROKU_TEST_RUN_BRANCH || '';
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
function _getService() {
    return 'heroku';
}
function getServiceName() {
    return 'Heroku CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.HEROKU_TEST_RUN_COMMIT_VERSION || '';
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
        'CI',
        'HEROKU_TEST_RUN_BRANCH',
        'HEROKU_TEST_RUN_COMMIT_VERSION',
        'HEROKU_TEST_RUN_ID',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_herokuci.js.map