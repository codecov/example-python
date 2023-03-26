"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVarNames = exports.getServiceParams = exports.getServiceName = exports.detect = void 0;
/**
 * https://docs.github.com/en/actions/learn-github-actions/environment-variables
 */
const undici_1 = require("undici");
const util_1 = require("../helpers/util");
const logger_1 = require("../helpers/logger");
function detect(envs) {
    return Boolean(envs.GITHUB_ACTIONS);
}
exports.detect = detect;
function _getBuild(inputs) {
    const { args, environment: envs } = inputs;
    return args.build || envs.GITHUB_RUN_ID || '';
}
async function _getJobURL(inputs) {
    (0, logger_1.info)('the url');
    (0, logger_1.info)(`https://api.github.com/repos/${_getSlug(inputs)}/actions/runs/${_getBuild(inputs)}/jobs`);
    const res = await (0, undici_1.request)(`https://api.github.com/repos/${_getSlug(inputs)}/actions/runs/${_getBuild(inputs)}/jobs`);
    (0, logger_1.info)('res');
    (0, logger_1.info)(`${res}`);
    (0, logger_1.info)('statusCode');
    (0, logger_1.info)(`${res.statusCode}`);
    if (res.statusCode !== 200) {
        return '';
    }
    const data = await res.body.text();
    (0, logger_1.info)('data');
    (0, logger_1.info)(`${data}`);
    return data;
}
async function _getBuildURL(inputs) {
    const { environment: envs } = inputs;
    const url = await _getJobURL(inputs);
    if (url !== '') {
        return url;
    }
    return (`${envs.GITHUB_SERVER_URL}/${_getSlug(inputs)}/actions/runs/${_getBuild(inputs)}`);
}
function _getBranch(inputs) {
    const { args, environment: envs } = inputs;
    const branchRegex = /refs\/heads\/(.*)/;
    const branchMatches = branchRegex.exec(envs.GITHUB_REF || '');
    let branch;
    if (branchMatches) {
        branch = branchMatches[1];
    }
    if (envs.GITHUB_HEAD_REF && envs.GITHUB_HEAD_REF !== '') {
        branch = envs.GITHUB_HEAD_REF;
    }
    return args.branch || branch || '';
}
function _getJob(envs) {
    return (envs.GITHUB_WORKFLOW || '');
}
function _getPR(inputs) {
    const { args, environment: envs } = inputs;
    let match;
    if (envs.GITHUB_HEAD_REF && envs.GITHUB_HEAD_REF !== '') {
        const prRegex = /refs\/pull\/([0-9]+)\/merge/;
        const matches = prRegex.exec(envs.GITHUB_REF || '');
        if (matches) {
            match = matches[1];
        }
    }
    return args.pr || match || '';
}
function _getService() {
    return 'github-actions';
}
function getServiceName() {
    return 'GitHub Actions';
}
exports.getServiceName = getServiceName;
function _getSHA(inputs) {
    const { args, environment: envs } = inputs;
    if (args.sha)
        return args.sha;
    const pr = _getPR(inputs);
    let commit = envs.GITHUB_SHA;
    if (pr) {
        const mergeCommitRegex = /^[a-z0-9]{40} [a-z0-9]{40}$/;
        const mergeCommitMessage = (0, util_1.runExternalProgram)('git', ['show', '--no-patch', '--format=%P']);
        logger_1.UploadLogger.verbose(`Handling PR with parent hash(es) '${mergeCommitMessage}' of current commit.`);
        if (mergeCommitRegex.exec(mergeCommitMessage)) {
            const mergeCommit = mergeCommitMessage.split(' ')[1];
            (0, logger_1.info)(`    Fixing merge commit SHA ${commit} -> ${mergeCommit}`);
            commit = mergeCommit;
        }
        else if (mergeCommitMessage === '') {
            (0, logger_1.info)('->  Issue detecting commit SHA. Please run actions/checkout with fetch-depth > 1 or set to 0');
        }
        else {
            (0, logger_1.info)(`    Commit with SHA ${commit} of PR ${pr} is not a merge commit`);
        }
    }
    return args.sha || commit || '';
}
function _getSlug(inputs) {
    const { args, environment: envs } = inputs;
    if (args.slug !== '')
        return args.slug;
    return envs.GITHUB_REPOSITORY || '';
}
async function getServiceParams(inputs) {
    return {
        branch: _getBranch(inputs),
        build: _getBuild(inputs),
        buildURL: await _getBuildURL(inputs),
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
        'GITHUB_ACTION',
        'GITHUB_HEAD_REF',
        'GITHUB_REF',
        'GITHUB_REPOSITORY',
        'GITHUB_RUN_ID',
        'GITHUB_SERVER_URL',
        'GITHUB_SHA',
        'GITHUB_WORKFLOW',
    ];
}
exports.getEnvVarNames = getEnvVarNames;
//# sourceMappingURL=provider_githubactions.js.map