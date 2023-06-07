"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bci = __importStar(require("../src/browserify-code-injector"));
var mocha_1 = require("mocha");
var assert_1 = require("assert");
var path = __importStar(require("path"));
var stubCallerPath = path.join(module.path, '..', 'stub', 'stub-caller');
(0, mocha_1.describe)("browserify-code-injector", function () {
    (0, mocha_1.it)("browserifyScript", function (done) {
        bci.browserifyScript(stubCallerPath, 'stub-caller')
            .then(function (code) { (0, assert_1.notStrictEqual)('', code); done(); })
            .catch(function (err) { return done(err); });
    });
    (0, mocha_1.it)("browserifyAndCallWithParams", function (done) {
        bci.browserifyAndCallWithParams(stubCallerPath, 'testCall', 'stubCallerPath', ['+'])
            .then(function (code) {
            (0, assert_1.strictEqual)('Hello!!Hello!!+', eval(code));
            done();
        })
            .catch(function (err) { return done(err); });
    });
});
