import { IServiceParams, UploaderEnvs, UploaderInputs } from '../types';
/**
 * Detects if this CI provider is being used
 *
 * @param {*} envs an object of enviromental variable key/value pairs
 * @returns boolean
 */
export declare function detect(envs: UploaderEnvs): boolean;
/**
 * The CI service name that gets sent to the Codecov uploader as part of the query string
 *
 * @returns {string}
 */
export declare function _getService(): string;
/**
 * The CI Service name that gets displayed when running the uploader
 *
 * @returns
 */
export declare function getServiceName(): string;
/**
 * Generates and return the serviceParams object
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {{ branch: string, build: string, buildURL: string, commit: string, job: string, pr: string, service: string, slug: string }}
 */
export declare function getServiceParams(inputs: UploaderInputs): Promise<IServiceParams>;
export declare function getEnvVarNames(): string[];
