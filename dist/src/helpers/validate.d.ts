/**
 *
 * @param {string} token
 * @returns boolean
 */
export declare function validateToken(token: string): boolean;
export declare function validateURL(url: string): boolean;
export declare function isValidFlag(flag: string): boolean;
export declare function validateFlags(flags: string[]): void;
export declare function validateSHA(commitSHA: string, requestedLength?: number): boolean;
