import * as bci from "../src";
import { describe, it } from "mocha";
import { strictEqual, deepStrictEqual, notStrictEqual } from "assert";
import * as path from "path";

const stubCallerPath = path.join(module.path, '..', 'stub', 'stub-caller');

describe("browserify-code-injector", () => {
    it("browserifyScript", (done) => {
        bci.browserifyScript(stubCallerPath, 'stub-caller')
            .then(code => {notStrictEqual('', code); done();})
            .catch(err => done(err));
    })

    it("browserifyAndCallWithParams", (done) => {
        bci.browserifyAndCallWithParams(stubCallerPath, 'testCall', 
            'stubCallerPath', ['+'])
            .then(code => {
                strictEqual('Hello!!Hello!!+', eval(code));
                done();
            })
            .catch(err => done(err));
    })
})