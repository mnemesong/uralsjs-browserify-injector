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
    filePseudonim: string|null = null,
    params: Array<unknown> = []
): Promise<string> {
    const paramsStr = params.map(p => JSON.stringify(p)).join(", ");
    return browserifyScript(codeFilePath, filePseudonim)
        .then(s => s + `\n(() => {\nconst ${filePseudonim} = require('${filePseudonim}');`
            + `\nreturn ${filePseudonim}.${functionName}(${paramsStr});})();`)
}