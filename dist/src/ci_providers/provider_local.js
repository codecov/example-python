"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const git_1 = require("../helpers/git");
const util_1 = require("../helpers/util");
// This provider requires git to be installed
function detect() {
    return (0, util_1.isProgramInstalled)('git');
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args } = inputs;
    return args.build || '';
}
function _getBuildURL() {
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    const branch = args.branch || envs.GIT_BRANCH || envs.BRANCH_NAME || '';
    if (branch !== '') {
        return branch;
    }
    try {
        const branchName = (0, util_1.runExternalProgram)('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
        return branchName;
    }
    catch (error) {
        throw new Error(`There was an error getting the branch name from git: ${error}`);
    }
}
function _getJob() {
    return '';
}
function _getPR(inputs) {
    const { args } = inputs;
    return args.pr || '';
}
// This is the value that gets passed to the Codecov uploader
function _getService() {
    return '';
}
// This is the name that gets printed
function getServiceName() {
    return 'Local';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    const sha = args.sha || envs.GIT_COMMIT || '';
    if (sha !== '') {
        return sha;
    }
    try {
        const sha = (0, util_1.runExternalProgram)('git', ['rev-parse', 'HEAD']);
        return sha;
    }
    catch (error) {
        throw new Error(`There was an error getting the commit SHA from git: ${error}`);
    }
}
function _getSlug(inputs) {
    const { args } = inputs;
    if (args.slug) {
        return args.slug;
    }
    try {
        const slug = (0, util_1.runExternalProgram)('git', ['config', '--get', 'remote.origin.url']);
        return (0, git_1.parseSlug)(slug);
    }
    catch (error) {
        throw new Error(`There was an error getting the slug from git: ${error}`);
    }
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
        'BRANCH_NAME',
        'CI',
        'GIT_BRANCH',
        'GIT_COMMIT',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_local.js.map