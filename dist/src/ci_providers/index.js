"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const providerAppveyorci = __importStar(require("./provider_appveyorci"));
const providerAzurepipelines = __importStar(require("./provider_azurepipelines"));
const providerBitbucket = __importStar(require("./provider_bitbucket"));
const providerBitrise = __importStar(require("./provider_bitrise"));
const providerBuildkite = __importStar(require("./provider_buildkite"));
const providerCircleci = __importStar(require("./provider_circleci"));
const providerCirrus = __importStar(require("./provider_cirrus"));
const providerCodeBuild = __importStar(require("./provider_codebuild"));
const providerDrone = __importStar(require("./provider_drone"));
const providerGitHubactions = __importStar(require("./provider_githubactions"));
const providerGitLabci = __importStar(require("./provider_gitlabci"));
const providerHerokuci = __importStar(require("./provider_herokuci"));
const providerJenkinsci = __importStar(require("./provider_jenkinsci"));
const providerLocal = __importStar(require("./provider_local"));
const providerTeamCity = __importStar(require("./provider_teamcity"));
const providerTravisci = __importStar(require("./provider_travisci"));
const providerWercker = __importStar(require("./provider_wercker"));
const providerWoodpecker = __importStar(require("./provider_woodpecker"));
// Please make sure provider_local is last
const providerList = [
    providerAppveyorci,
    providerAzurepipelines,
    providerBitbucket,
    providerBitrise,
    providerBuildkite,
    providerCircleci,
    providerCirrus,
    providerCodeBuild,
    providerDrone,
    providerGitHubactions,
    providerGitLabci,
    providerHerokuci,
    providerJenkinsci,
    providerTeamCity,
    providerTravisci,
    providerWercker,
    providerWoodpecker,
    providerLocal,
];
exports.default = providerList;
//# sourceMappingURL=index.js.map