"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const provider_1 = require("../helpers/provider");
function detect(envs) {
    return Boolean(envs.WERCKER_MAIN_PIPELINE_STARTED);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.WERCKER_MAIN_PIPELINE_STARTED || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    return envs.WERCKER_BUILD_URL || '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.WERCKER_GIT_BRANCH || '';
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
function _getService() {
    return 'wercker';
}
function getServiceName() {
    return 'Wercker CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.WERCKER_GIT_COMMIT || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    return (0, provider_1.setSlug)(args.slug, envs.WERCKER_GIT_OWNER, envs.WERCKER_GIT_REPOSITORY);
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
    return ['WERCKER_MAIN_PIPELINE_STARTED'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_wercker.js.map