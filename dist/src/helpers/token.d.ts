import { UploaderInputs } from '../types';
/**
 *
 * @param {object} inputs
 * @param {string} projectRoot
 * @returns string
 */
export declare function getToken(inputs: UploaderInputs, projectRoot: string): string;
export declare function getTokenFromYaml(projectRoot: string): string;
