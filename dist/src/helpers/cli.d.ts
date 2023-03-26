export interface ICLIArgument {
    name: string;
    alias: string;
    type?: string;
    default?: string | boolean;
    description: string;
}
export interface IYargsObject {
    option: (arg0: string, arg1: ICLIArgument) => void;
}
export declare function addArguments(yargsInstance: IYargsObject): void;
