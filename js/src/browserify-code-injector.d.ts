export declare function browserifyScript(codeFilePath: string, pseudonim: string): Promise<string>;
export declare function browserifyAndCallWithParams(codeFilePath: string, functionName: string, filePseudonim?: string | null, params?: Array<unknown>): Promise<string>;
