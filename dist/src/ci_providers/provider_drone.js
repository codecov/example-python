"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
function detect(envs) {
    return Boolean(envs.DRONE);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.DRONE_BUILD_NUMBER || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    return envs.DRONE_BUILD_LINK || envs.DRONE_BUILD_URL || envs.CI_BUILD_URL || '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.DRONE_BRANCH || '';
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.DRONE_PULL_REQUEST || '';
}
function _getService() {
    return 'drone.io';
}
function getServiceName() {
    return 'Drone';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.DRONE_COMMIT_SHA || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.DRONE_REPO || '';
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
        'DRONE',
        'DRONE_BRANCH',
        'DRONE_BUILD_NUMBER',
        'DRONE_BUILD_URL',
        'DRONE_COMMIT_SHA',
        'DRONE_PULL_REQUEST',
        'DRONE_REPO',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_drone.js.map