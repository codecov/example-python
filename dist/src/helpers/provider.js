"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSlug = exports.walkProviders = exports.detectProvider = void 0;
const ci_providers_1 = __importDefault(require("../ci_providers"));
const logger_1 = require("../helpers/logger");
function detectProvider(inputs, hasToken = false) {
    const { args } = inputs;
    let serviceParams;
    //   check if we have a complete set of manual overrides (slug, SHA)
    if (args.sha && (args.slug || hasToken)) {
        // We have the needed args for a manual override
        (0, logger_1.info)(`Using manual override from args.`);
        serviceParams = {
            commit: args.sha,
            ...(hasToken ? {} : { slug: args.slug }),
        };
    }
    else {
        serviceParams = undefined;
    }
    //   loop though all providers
    try {
        return { ...walkProviders(inputs), ...serviceParams };
    }
    catch (error) {
        //   if fails, display message explaining failure, and explaining that SHA and slug need to be set as args
        if (typeof serviceParams !== 'undefined') {
            (0, logger_1.logError)(`Error detecting repos setting using git: ${error}`);
        }
        else {
            throw new Error('\nUnable to detect SHA and slug, please specify them manually.\nSee the help for more details.');
        }
    }
    return serviceParams;
}
exports.detectProvider = detectProvider;
function walkProviders(inputs) {
    for (const provider of ci_providers_1.default) {
        if (provider.detect(inputs.environment)) {
            (0, logger_1.info)(`Detected ${provider.getServiceName()} as the CI provider.`);
            logger_1.UploadLogger.verbose('-> Using the following env variables:');
            for (const envVarName of provider.getEnvVarNames()) {
                logger_1.UploadLogger.verbose(`     ${envVarName}: ${inputs.environment[envVarName]}`);
            }
            return provider.getServiceParams(inputs);
        }
    }
    throw new Error(`Unable to detect provider.`);
}
exports.walkProviders = walkProviders;
function setSlug(slugArg, orgEnv, repoEnv) {
    if (typeof slugArg !== "undefined" && slugArg !== '') {
        return slugArg;
    }
    if (typeof orgEnv !== 'undefined' &&
        typeof repoEnv !== 'undefined' &&
        orgEnv !== '' &&
        repoEnv !== '') {
        return `${orgEnv}/${repoEnv}`;
    }
    return '';
}
exports.setSlug = setSlug;
//# sourceMappingURL=provider.js.map