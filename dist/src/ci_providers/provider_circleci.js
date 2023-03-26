"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const provider_1 = require("../helpers/provider");
const util_1 = require("../helpers/util");
function detect(envs) {
    return Boolean(envs.CI) && Boolean(envs.CIRCLECI);
}
exports.detect = detect;
function _getBuildURL(inputs) {
    return inputs.environment['CIRCLE_BUILD_URL'] ?? '';
}
// This is the value that gets passed to the Codecov uploader
function _getService() {
    return 'circleci';
}
// This is the name that gets printed
function getServiceName() {
    return 'CircleCI';
}
exports.getServiceName = getServiceName;
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    return args.branch || envs.CIRCLE_BRANCH || '';
}
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    return args.sha || envs.CIRCLE_SHA1 || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    const slug = (0, provider_1.setSlug)(args.slug, envs.CIRCLE_PROJECT_USERNAME, envs.CIRCLE_PROJECT_REPONAME);
    if (slug !== '') {
        return slug;
    }
    if ((0, util_1.isSetAndNotEmpty)(envs.CIRCLE_REPOSITORY_URL)) {
        return `${envs.CIRCLE_REPOSITORY_URL?.split(':')[1]?.split('.git')[0]}`;
    }
    return slug;
}
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.CIRCLE_BUILD_NUM || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return args.pr || envs.CIRCLE_PR_NUMBER || '';
}
function _getJob(envs) {
    return envs.CIRCLE_NODE_INDEX || '';
}
async function getServiceParams(inputs) {
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
    return ['CI', 'CIRCLECI'];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_circleci.js.map