"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFixes = exports.FIXES_HEADER = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const files_1 = require("./files");
const logger_1 = require("./logger");
exports.FIXES_HEADER = '# path=fixes\n';
async function generateFixes(projectRoot) {
    // Fake out the UploaderArgs as they are not needed
    const allFiles = await (0, files_1.getAllFiles)(projectRoot, projectRoot, {
        flags: '',
        slug: '',
        upstream: '',
    });
    const allAdjustments = [];
    const EMPTYLINE = /^\s*$/mg;
    // { or }
    const SYNTAXBRACKET = /^\s*[{}]\s*(\/\/.*)?$/m;
    // [ or ]
    const SYNTAXLIST = /^\s*[[\]]\s*(\/\/.*)?$/m;
    // //
    const SYNTAXCOMMENT = /^\s*\/\/.*$/m;
    // /* or */
    const SYNTAXBLOCK = /^\s*(\/\*|\*\/).*$/m;
    // func {
    const SYNTAXGOFUNC = /^\s*func.*\{\s*$/mg;
    for (const file of allFiles) {
        let lineAdjustments = [];
        if (file.match(/\.c$/) ||
            file.match(/\.cpp$/) ||
            file.match(/\.h$/) ||
            file.match(/\.hpp$/) ||
            file.match(/\.m$/) ||
            file.match(/\.swift$/) ||
            file.match(/\.vala$/)) {
            lineAdjustments = await getMatchedLines(file, [EMPTYLINE, SYNTAXBRACKET]);
        }
        else if (file.match(/\.php$/)) {
            lineAdjustments = await getMatchedLines(file, [SYNTAXBRACKET, SYNTAXLIST]);
        }
        else if (file.match(/\.go$/)) {
            lineAdjustments = await getMatchedLines(file, [EMPTYLINE, SYNTAXCOMMENT, SYNTAXBLOCK, SYNTAXBRACKET, SYNTAXGOFUNC]);
        }
        else if (file.match(/\.kt$/)) {
            lineAdjustments = await getMatchedLines(file, [SYNTAXBRACKET, SYNTAXCOMMENT]);
        }
        if (lineAdjustments.length > 0) {
            logger_1.UploadLogger.verbose(`Matched file ${file} for adjustments: ${lineAdjustments.join(',')}`);
            allAdjustments.push(`${file}:${lineAdjustments.join(',')}\n`);
        }
    }
    return allAdjustments.join('');
}
exports.generateFixes = generateFixes;
async function getMatchedLines(file, matchers) {
    const fileStream = fs_1.default.createReadStream(file);
    const rl = readline_1.default.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const matchedLines = [];
    let lineNumber = 1;
    for await (const line of rl) {
        for (const matcher of matchers) {
            if (line.match(matcher)) {
                matchedLines.push(lineNumber.toString());
                break;
            }
        }
        lineNumber++;
    }
    return matchedLines;
}
//# sourceMappingURL=fixes.js.map