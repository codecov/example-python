"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
function detect(envs) {
    return Boolean(envs.CODEBUILD_CI);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.CODEBUILD_BUILD_ID || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return (args.branch ||
        (envs.CODEBUILD_WEBHOOK_HEAD_REF
            ? envs.CODEBUILD_WEBHOOK_HEAD_REF.replace(/^refs\/heads\//, '')
            : ''));
}
function _getJob(envs) {
    return envs.CODEBUILD_BUILD_ID || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return (args.pr ||
        (envs.CODEBUILD_SOURCE_VERSION &&
            envs.CODEBUILD_SOURCE_VERSION.startsWith('pr/')
            ? envs.CODEBUILD_SOURCE_VERSION.replace(/^pr\//, '')
            : ''));
}
function _getService() {
    return 'codebuild';
}
function getServiceName() {
    return 'AWS CodeBuild';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.CODEBUILD_RESOLVED_SOURCE_VERSION || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return ((envs.CODEBUILD_SOURCE_REPO_URL
        ? envs.CODEBUILD_SOURCE_REPO_URL.toString()
            .replace(/^.*github.com\//, '') // lgtm [js/incomplete-hostname-regexp] - We want this to match all subdomains.
            .replace(/\.git$/, '')
        : ''));
}
function getServiceParams(inputs) {
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
    return [
        'CODEBUILD_BUILD_ID',
        'CODEBUILD_CI',
        'CODEBUILD_RESOLVED_SOURCE_VERSION',
        'CODEBUILD_SOURCE_REPO_URL',
        'CODEBUILD_SOURCE_VERSION',
        'CODEBUILD_WEBHOOK_HEAD_REF',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_codebuild.js.map