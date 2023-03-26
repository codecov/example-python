"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
const child_process_1 = __importDefault(require("child_process"));
const git_1 = require("../helpers/git");
const logger_1 = require("../helpers/logger");
function detect(envs) {
    return Boolean(envs.SYSTEM_TEAMFOUNDATIONSERVERURI);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.BUILD_BUILDNUMBER || '';
}
function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    if (envs.SYSTEM_TEAMPROJECT && envs.BUILD_BUILDID) {
        return (`${envs.SYSTEM_TEAMFOUNDATIONSERVERURI}${envs.SYSTEM_TEAMPROJECT}/_build/results?buildId=${envs.BUILD_BUILDID}`);
    }
    return '';
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    let branch = '';
    if (envs.BUILD_SOURCEBRANCH) {
        branch = envs.BUILD_SOURCEBRANCH.toString().replace('refs/heads/', '');
    }
    return args.branch || branch;
}
function _getJob(envs) {
    return envs.BUILD_BUILDID || '';
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    return (args.pr ||
        envs.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ||
        envs.SYSTEM_PULLREQUEST_PULLREQUESTID ||
        '');
}
function _getService() {
    return 'azure_pipelines';
}
function getServiceName() {
    return 'Azure Pipelines';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    let commit = envs.BUILD_SOURCEVERSION || '';
    if (_getPR(inputs)) {
        const mergeCommitRegex = /^[a-z0-9]{40} [a-z0-9]{40}$/;
        const mergeCommitMessage = child_process_1.default
            .execFileSync('git', ['show', '--no-patch', '--format=%P'])
            .toString()
            .trimRight();
        if (mergeCommitRegex.exec(mergeCommitMessage)) {
            const mergeCommit = mergeCommitMessage.split(' ')[1];
            (0, logger_1.info)(`    Fixing merge commit SHA ${commit} -> ${mergeCommit}`);
            commit = mergeCommit || '';
        }
    }
    return args.sha || commit || '';
}
function _getProject(inputs) {
    const { environment: envs } = inputs;
    return envs.SYSTEM_TEAMPROJECT || '';
}
function _getServerURI(inputs) {
    const { environment: envs } = inputs;
    return envs.SYSTEM_TEAMFOUNDATIONSERVERURI || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.BUILD_REPOSITORY_NAME || (0, git_1.parseSlugFromRemoteAddr)('') || '';
}
/**
 * Generates and return the serviceParams object
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {{ branch: string, build: string, buildURL: string, commit: string, job: string, pr: string, service: string, slug: string }}
 */
async function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: _getBuildURL(inputs),
        commit: _getSHA(inputs),
        job: _getJob(inputs.environment),
        pr: _getPR(inputs),
        project: _getProject(inputs),
        server_uri: _getServerURI(inputs),
        service: _getService(),
        slug: _getSlug(inputs),
    };
}
exports.getServiceParams = getServiceParams;
function getEnvVarNames() {
    return [
        'BUILD_BUILDID',
        'BUILD_BUILDNUMBER',
        'BUILD_SOURCEBRANCH',
        'BUILD_SOURCEVERSION',
        'SYSTEM_PULLREQUEST_PULLREQUESTID',
        'SYSTEM_PULLREQUEST_PULLREQUESTNUMBER',
        'SYSTEM_TEAMFOUNDATIONSERVERURI',
        'SYSTEM_TEAMPROJECT',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_azurepipelines.js.map