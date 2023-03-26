/// <reference types="node" />
import { Dispatcher, ProxyAgent } from "undici";
export interface UploaderArgs {
    branch?: string;
    build?: string;
    changelog?: string;
    clean?: string;
    dir?: string;
    dryRun?: string;
    env?: string;
    feature?: string;
    file?: string | string[];
    flags: string | string[];
    gcov?: string;
    gcovArgs?: string | string[];
    gcovIgnore?: string | string[];
    gcovInclude?: string | string[];
    gcovExecutable?: string;
    name?: string;
    networkFilter?: string;
    networkPrefix?: string;
    nonZero?: string;
    parent?: string;
    pr?: string;
    rootDir?: string;
    sha?: string;
    slug: string;
    source?: string;
    swift?: string;
    swiftProject?: string;
    tag?: string;
    token?: string;
    upstream: string;
    url?: string;
    verbose?: string;
    xcode?: string;
    xcodeArchivePath?: string;
}
export declare type UploaderEnvs = NodeJS.Dict<string>;
export interface UploaderInputs {
    environment: UploaderEnvs;
    args: UploaderArgs;
}
export interface IProvider {
    detect: (arg0: UploaderEnvs) => boolean;
    getServiceName: () => string;
    getServiceParams: (arg0: UploaderInputs) => Promise<IServiceParams>;
    getEnvVarNames: () => string[];
}
export interface IServiceParams {
    branch: string;
    build: string;
    buildURL: string;
    commit: string;
    job: string;
    pr: string | '';
    service: string;
    slug: string;
    name?: string;
    tag?: string;
    flags?: string;
    parent?: string;
    project?: string;
    server_uri?: string;
}
export interface IRequestHeaders {
    agent?: ProxyAgent;
    url: URL;
    options: Dispatcher.RequestOptions;
}
export interface PostResults {
    putURL: URL;
    resultURL: URL;
}
export interface PutResults {
    status: string;
    resultURL: URL;
}
export declare type XcodeCoverageFileReport = Record<string, string | null>;
export declare type XcodeCoverageReport = Record<string, XcodeCoverageFileReport>;
