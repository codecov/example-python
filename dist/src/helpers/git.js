"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSlugFromRemoteAddr = exports.parseSlug = void 0;
const util_1 = require("./util");
function parseSlug(slug) {
    // origin    https://github.com/torvalds/linux.git (fetch)
    // git@github.com: codecov / uploader.git
    if (typeof slug !== 'string') {
        return '';
    }
    if (slug.match('http:') || slug.match('https:') || slug.match('ssh:')) {
        // Type is http(s) or ssh
        const phaseOne = slug.split('//')[1]?.replace('.git', '') || '';
        const phaseTwo = phaseOne?.split('/') || '';
        const cleanSlug = phaseTwo.length > 2 ? `${phaseTwo[1]}/${phaseTwo[2]}` : '';
        return cleanSlug;
    }
    else if (slug.match('@')) {
        // Type is git
        const cleanSlug = slug.split(':')[1]?.replace('.git', '');
        return cleanSlug || '';
    }
    throw new Error(`Unable to parse slug URL: ${slug}`);
}
exports.parseSlug = parseSlug;
function parseSlugFromRemoteAddr(remoteAddr) {
    let slug = '';
    if (!remoteAddr) {
        remoteAddr = ((0, util_1.runExternalProgram)('git', ['config', '--get', 'remote.origin.url']) || '');
    }
    if (remoteAddr) {
        slug = parseSlug(remoteAddr);
    }
    if (slug === '/') {
        slug = '';
    }
    return slug;
}
exports.parseSlugFromRemoteAddr = parseSlugFromRemoteAddr;
//# sourceMappingURL=git.js.map