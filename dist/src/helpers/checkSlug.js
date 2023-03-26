"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSlug = void 0;
function checkSlug(slug) {
    if (slug !== '' && !slug.match(/\//)) {
        return false;
    }
    return true;
}
exports.checkSlug = checkSlug;
//# sourceMappingURL=checkSlug.js.map