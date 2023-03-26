"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
/**
 * https://cirrus-ci.org/guide/writing-tasks/#environment-variables
 */
const provider_1 = require("../helpers/provider");
function detect(envs) {
    return Boolean(envs.CIRRUS_CI);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.CIRRUS_BUILD_ID || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.CIRRUS_BRANCH || '';
}
function _getJob(envs) {
    return envs.CIRRUS_TASK_ID || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.CIRRUS_PR || '';
}
function _getService() {
    return 'cirrus-ci';
}
function getServiceName() {
    return 'Cirrus CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.CIRRUS_CHANGE_IN_REPO || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    return (0, provider_1.setSlug)(args.slug, envs.CIRRUS_REPO_OWNER, envs.CIRRUS_REPO_NAME);
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
    return ['CIRRUS_CI'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_cirrus.js.map