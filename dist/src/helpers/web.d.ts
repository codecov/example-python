/// <reference types="node" />
import { IRequestHeaders, IServiceParams, PostResults, PutResults, UploaderArgs, UploaderInputs } from '../types';
/**
 *
 * @param {Object} inputs
 * @param {NodeJS.ProcessEnv} inputs.envs
 * @param {Object} serviceParams
 * @returns Object
 */
export declare function populateBuildParams(inputs: UploaderInputs, serviceParams: Partial<IServiceParams>): Partial<IServiceParams>;
export declare function getPackage(source: string): string;
export declare function uploadToCodecovPUT(putAndResultUrlPair: PostResults, uploadFile: string | Buffer, args: UploaderArgs): Promise<PutResults>;
export declare function uploadToCodecovPOST(postURL: URL, token: string, query: string, source: string, args: UploaderArgs): Promise<string>;
/**
 *
 * @param {Object} queryParams
 * @returns {string}
 */
export declare function generateQuery(queryParams: Partial<IServiceParams>): string;
export declare function parsePOSTResults(putAndResultUrlPair: string): PostResults;
export declare function displayChangelog(): void;
export declare function generateRequestHeadersPOST(postURL: URL, token: string, query: string, source: string, args: UploaderArgs): IRequestHeaders;
export declare function generateRequestHeadersPUT(uploadURL: URL, uploadFile: string | Buffer, args: UploaderArgs): IRequestHeaders;
