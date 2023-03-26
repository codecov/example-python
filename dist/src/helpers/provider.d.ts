import { IServiceParams, UploaderInputs } from '../types';
export declare function detectProvider(inputs: UploaderInputs, hasToken?: boolean): Partial<IServiceParams>;
export declare function walkProviders(inputs: UploaderInputs): IServiceParams;
export declare function setSlug(slugArg: string | undefined, orgEnv: string | undefined, repoEnv: string | undefined): string;
