export { SPAWNPROCESSBUFFERSIZE } from './constansts';
export declare function isProgramInstalled(programName: string): boolean;
export declare function runExternalProgram(programName: string, optionalArguments?: string[]): string;
export declare function isSetAndNotEmpty(val: string | undefined): boolean;
export declare function argAsArray<T>(args?: T | T[]): T[];
