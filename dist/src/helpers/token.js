"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromYaml = exports.getToken = void 0;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const constansts_1 = require("./constansts");
const logger_1 = require("./logger");
const validate_1 = require("./validate");
/**
 *
 * @param {object} inputs
 * @param {string} projectRoot
 * @returns string
 */
function getToken(inputs, projectRoot) {
    const { args, environment: envs } = inputs;
    const options = [
        [args.token, 'arguments'],
        [envs.CODECOV_TOKEN, 'environment variables'],
        [getTokenFromYaml(projectRoot), 'Codecov yaml config'],
    ];
    for (const [token, source] of options) {
        if (token) {
            (0, logger_1.info)(`->  Token found by ${source}`);
            // If this is self-hosted (-u is set), do not validate
            // This is because self-hosted can use a global upload token
            if (args.url !== constansts_1.DEFAULT_UPLOAD_HOST) {
                logger_1.UploadLogger.verbose('Self-hosted install detected due to -u flag');
                (0, logger_1.info)(`->  Token set by ${source}`);
                return token;
            }
            if ((0, validate_1.validateToken)(token) !== true) {
                throw new Error(`Token found by ${source} with length ${token?.length} did not pass validation`);
            }
            return token;
        }
    }
    return '';
}
exports.getToken = getToken;
// eslint-disable-next-line @typescript-eslint/ban-types
function yamlParse(input) {
    let yaml;
    if (typeof input === 'string') {
        yaml = JSON.parse(input);
    }
    else if (typeof input === 'number') {
        yaml = JSON.parse(input.toString());
    }
    else {
        yaml = input;
    }
    return yaml;
}
function getTokenFromYaml(projectRoot) {
    const dirNames = ['', '.github', 'dev'];
    const yamlNames = [
        '.codecov.yaml',
        '.codecov.yml',
        'codecov.yaml',
        'codecov.yml',
    ];
    for (const dir of dirNames) {
        for (const name of yamlNames) {
            const filePath = path_1.default.join(projectRoot, dir, name);
            try {
                if (fs_1.default.existsSync(filePath)) {
                    const fileContents = fs_1.default.readFileSync(filePath, {
                        encoding: 'utf-8',
                    });
                    const yamlConfig = yamlParse(new Object(js_yaml_1.default.load(fileContents, { json: true }) || {}));
                    if (yamlConfig['codecov'] &&
                        yamlConfig['codecov']['token'] &&
                        (0, validate_1.validateToken)(yamlConfig['codecov']['token'])) {
                        return yamlConfig['codecov']['token'];
                    }
                    if (yamlConfig['codecov_token']) {
                        (0, logger_1.logError)(`'codecov_token' is a deprecated field. Please switch to 'codecov.token' ` +
                            '(https://docs.codecov.com/docs/codecovyml-reference#codecovtoken)');
                    }
                }
            }
            catch (err) {
                logger_1.UploadLogger.verbose(`Error searching for upload token in ${filePath}: ${err}`);
            }
        }
    }
    return '';
}
exports.getTokenFromYaml = getTokenFromYaml;
//# sourceMappingURL=token.js.map