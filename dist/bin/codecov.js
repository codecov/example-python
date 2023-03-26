#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const cli_1 = require("../src/helpers/cli");
var argv = require('yargs'); // eslint-disable-line
argv.usage('Usage: $0 <command> [options]');
(0, cli_1.addArguments)(argv);
argv.version().help('help').alias('help', 'h').argv;
const realArgs = argv.argv;
const start = Date.now();
(0, src_1.verbose)(`Start of uploader: ${start}...`, realArgs.verbose);
(0, src_1.main)(realArgs)
    .then(() => {
    const end = Date.now();
    (0, src_1.verbose)(`End of uploader: ${end - start} milliseconds`, realArgs.verbose);
})
    .catch(error => {
    if (error instanceof Error) {
        (0, src_1.logError)(`There was an error running the uploader: ${error.message}`);
        (0, src_1.verbose)(`The error stack is: ${error.stack}`, realArgs.verbose);
    }
    const end = Date.now();
    (0, src_1.verbose)(`End of uploader: ${end - start} milliseconds`, realArgs.verbose);
    process.exit(realArgs.nonZero ? -1 : 0);
});
//# sourceMappingURL=codecov.js.map