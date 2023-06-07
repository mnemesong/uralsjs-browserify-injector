import browserify = require("browserify");

function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}

export async function browserifyScript(
    codeFilePath: string,
    pseudonim: string
): Promise<string> {
    const b = browserify();
    return streamToString(b.require(codeFilePath, {expose: pseudonim}).bundle());
}

export async function browserifyAndCallWithParams(
    codeFilePath: string,
    functionName: string,
    filePseudonim: string,
    params: Array<unknown> = []
): Promise<string> {
    return browserifyScript(codeFilePath, filePseudonim)
        .then(s => callCodeWithParams(s, functionName, filePseudonim, params))
}

export async function callCodeWithParams(
    code: string,
    functionName: string,
    filePseudonim: string|null = null,
    params: Array<unknown> = []
) {
    const paramsStr = params.map(p => JSON.stringify(p)).join(", ");
    return code + `\nrequire('${filePseudonim}').${functionName}(${paramsStr});`;
}