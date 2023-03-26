"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
function detect(envs) {
    return (Boolean(envs.CI) && Boolean(envs.TRAVIS)) && (Boolean(envs.SHIPPABLE) === false);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.TRAVIS_JOB_NUMBER || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    let branch = '';
    if (envs.TRAVIS_BRANCH !== envs.TRAVIS_TAG) {
        branch = envs.TRAVIS_PULL_REQUEST_BRANCH || envs.TRAVIS_BRANCH || '';
    }
    return args.branch || branch;
}
function _getJob(envs) {
    return envs.TRAVIS_JOB_ID || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.TRAVIS_PULL_REQUEST || '';
}
function _getService() {
    return 'travis';
}
function getServiceName() {
    return 'Travis CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.TRAVIS_PULL_REQUEST_SHA || envs.TRAVIS_COMMIT || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.TRAVIS_REPO_SLUG || '';
}
async function getServiceParams(inputs) {
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
    return ['TRAVIS'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_travisci.js.map