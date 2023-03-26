import { IServiceParams, UploaderInputs } from '../types';
export declare function detect(): boolean;
export declare function getServiceName(): string;
export declare function getServiceParams(inputs: UploaderInputs): Promise<IServiceParams>;
export declare function getEnvVarNames(): string[];
