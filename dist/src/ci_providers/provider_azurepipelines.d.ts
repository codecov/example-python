import { IServiceParams, UploaderEnvs, UploaderInputs } from '../types';
export declare function detect(envs: UploaderEnvs): boolean;
export declare function getServiceName(): string;
/**
 * Generates and return the serviceParams object
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {{ branch: string, build: string, buildURL: string, commit: string, job: string, pr: string, service: string, slug: string }}
 */
export declare function getServiceParams(inputs: UploaderInputs): IServiceParams;
export declare function getEnvVarNames(): string[];
