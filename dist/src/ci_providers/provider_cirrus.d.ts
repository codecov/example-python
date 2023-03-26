import { IServiceParams, UploaderEnvs, UploaderInputs } from '../types';
export declare function detect(envs: UploaderEnvs): boolean;
export declare function getServiceName(): string;
export declare function getServiceParams(inputs: UploaderInputs): Promise<IServiceParams>;
export declare function getEnvVarNames(): string[];
