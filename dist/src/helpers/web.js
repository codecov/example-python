"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRequestHeadersPUT = exports.generateRequestHeadersPOST = exports.displayChangelog = exports.parsePOSTResults = exports.generateQuery = exports.uploadToCodecovPOST = exports.uploadToCodecovPUT = exports.getPackage = exports.populateBuildParams = void 0;
const node_dns_1 = __importDefault(require("node:dns"));
const snake_case_1 = require("snake-case");
const undici_1 = require("undici");
const package_json_1 = require("../../package.json");
const logger_1 = require("./logger");
/**
 *
 * @param {Object} inputs
 * @param {NodeJS.ProcessEnv} inputs.envs
 * @param {Object} serviceParams
 * @returns Object
 */
function populateBuildParams(inputs, serviceParams) {
    const { args, environment: envs } = inputs;
    serviceParams.name = args.name || envs.CODECOV_NAME || '';
    serviceParams.tag = args.tag || '';
    if (typeof args.flags === "string") {
        serviceParams.flags = args.flags;
    }
    else {
        serviceParams.flags = args.flags.join(',');
    }
    serviceParams.parent = args.parent || '';
    return serviceParams;
}
exports.populateBuildParams = populateBuildParams;
function getPackage(source) {
    if (source) {
        return `${source}-uploader-${package_json_1.version}`;
    }
    else {
        return `uploader-${package_json_1.version}`;
    }
}
exports.getPackage = getPackage;
async function uploadToCodecovPUT(putAndResultUrlPair, uploadFile, args) {
    (0, logger_1.info)('Uploading...');
    const requestHeaders = generateRequestHeadersPUT(putAndResultUrlPair.putURL, uploadFile, args);
    if (requestHeaders.agent) {
        (0, undici_1.setGlobalDispatcher)(requestHeaders.agent);
    }
    node_dns_1.default.setDefaultResultOrder('ipv4first');
    const response = await (0, undici_1.request)(requestHeaders.url.origin, requestHeaders.options);
    if (response.statusCode !== 200) {
        const data = await response.body.text();
        throw new Error(`There was an error fetching the storage URL during PUT: ${response.statusCode} - ${data}`);
    }
    return { status: 'success', resultURL: putAndResultUrlPair.resultURL };
}
exports.uploadToCodecovPUT = uploadToCodecovPUT;
async function uploadToCodecovPOST(postURL, token, query, source, args) {
    const requestHeaders = generateRequestHeadersPOST(postURL, token, query, source, args);
    if (requestHeaders.agent) {
        (0, undici_1.setGlobalDispatcher)(requestHeaders.agent);
    }
    node_dns_1.default.setDefaultResultOrder('ipv4first');
    const response = await (0, undici_1.request)(requestHeaders.url.origin, requestHeaders.options);
    if (response.statusCode !== 200) {
        const data = await response.body.text();
        throw new Error(`There was an error fetching the storage URL during POST: ${response.statusCode} - ${data}`);
    }
    return await response.body.text();
}
exports.uploadToCodecovPOST = uploadToCodecovPOST;
/**
 *
 * @param {Object} queryParams
 * @returns {string}
 */
function generateQuery(queryParams) {
    return new URLSearchParams(Object.entries(queryParams).map(([key, value]) => [(0, snake_case_1.snakeCase)(key), value])).toString();
}
exports.generateQuery = generateQuery;
function parsePOSTResults(putAndResultUrlPair) {
    (0, logger_1.info)(putAndResultUrlPair);
    // JS for [[:graph:]] https://www.regular-expressions.info/posixbrackets.html
    const re = /([\x21-\x7E]+)[\r\n]?/gm;
    const matches = putAndResultUrlPair.match(re);
    if (matches === null) {
        throw new Error(`Parsing results from POST failed: (${putAndResultUrlPair})`);
    }
    if (matches?.length !== 2) {
        throw new Error(`Incorrect number of urls when parsing results from POST: ${matches.length}`);
    }
    if (matches[0] === undefined || matches[1] === undefined) {
        throw new Error(`Invalid URLs received when parsing results from POST: ${matches[0]},${matches[1]}`);
    }
    const resultURL = new URL(matches[0].trimEnd());
    const putURL = new URL(matches[1]);
    // This match may have trailing 0x0A and 0x0D that must be trimmed
    return { putURL, resultURL };
}
exports.parsePOSTResults = parsePOSTResults;
function displayChangelog() {
    (0, logger_1.info)(`The change log for this version (v${package_json_1.version}) can be found at`);
    (0, logger_1.info)(`https://github.com/codecov/uploader/blob/v${package_json_1.version}/CHANGELOG.md`);
}
exports.displayChangelog = displayChangelog;
function generateRequestHeadersPOST(postURL, token, query, source, args) {
    const url = new URL(`upload/v4?package=${getPackage(source)}&token=${token}&${query}`, postURL);
    return {
        agent: args.upstream ? new undici_1.ProxyAgent(args.upstream) : undefined,
        url: url,
        options: {
            headers: {
                'X-Upload-Token': token,
                'X-Reduced-Redundancy': 'false',
            },
            method: 'POST',
            origin: postURL,
            path: `${url.pathname}${url.search}`,
        },
    };
}
exports.generateRequestHeadersPOST = generateRequestHeadersPOST;
function generateRequestHeadersPUT(uploadURL, uploadFile, args) {
    return {
        agent: args.upstream ? new undici_1.ProxyAgent(args.upstream) : undefined,
        url: uploadURL,
        options: {
            body: uploadFile,
            headers: {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip',
            },
            method: 'PUT',
            origin: uploadURL,
            path: `${uploadURL.pathname}${uploadURL.search}`,
        },
    };
}
exports.generateRequestHeadersPUT = generateRequestHeadersPUT;
//# sourceMappingURL=web.js.map