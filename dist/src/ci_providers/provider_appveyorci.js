"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
function detect(envs) {
    return ((envs.CI === 'true' || envs.CI === 'True') &&
        (envs.APPVEYOR === 'true' || envs.APPVEYOR === 'True'));
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.APPVEYOR_JOB_ID || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    if (envs.APPVEYOR_URL &&
        envs.APPVEYOR_REPO_NAME &&
        envs.APPVEYOR_BUILD_ID &&
        envs.APPVEYOR_JOB_ID) {
        return (`${envs.APPVEYOR_URL}/project/${envs.APPVEYOR_REPO_NAME}/builds/${envs.APPVEYOR_BUILD_ID}/job/${envs.APPVEYOR_JOB_ID}`);
    }
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.APPVEYOR_REPO_BRANCH || '';
}
function _getJob(envs) {
    if (envs.APPVEYOR_ACCOUNT_NAME &&
        envs.APPVEYOR_PROJECT_SLUG &&
        envs.APPVEYOR_BUILD_VERSION) {
        return `${envs.APPVEYOR_ACCOUNT_NAME}/${envs.APPVEYOR_PROJECT_SLUG}/${envs.APPVEYOR_BUILD_VERSION}`;
    }
    return '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.APPVEYOR_PULL_REQUEST_NUMBER || '';
}
function _getService() {
    return 'appveyor';
}
function getServiceName() {
    return 'Appveyor CI';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.APPVEYOR_PULL_REQUEST_HEAD_COMMIT || envs.APPVEYOR_REPO_COMMIT || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.APPVEYOR_REPO_NAME || '';
}
function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(inputs),
        commit: _getSHA(inputs),
        job: _getJob(inputs.environment),
        pr: _getPR(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
function getEnvVarNames() {
    return [
        'APPVEYOR',
        'APPVEYOR_ACCOUNT_NAME',
        'APPVEYOR_BUILD_ID',
        'APPVEYOR_BUILD_VERSION',
        'APPVEYOR_JOB_ID',
        'APPVEYOR_PROJECT_SLUG',
        'APPVEYOR_PULL_REQUEST_HEAD_COMMIT',
        'APPVEYOR_PULL_REQUEST_NUMBER',
        'APPVEYOR_REPO_BRANCH',
        'APPVEYOR_REPO_COMMIT',
        'APPVEYOR_REPO_NAME',
        'APPVEYOR_URL',
        'CI',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_appveyorci.js.map