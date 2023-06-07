"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCall = void 0;
var stub_called_1 = require("./stub-called");
function double(str) {
    return str + str;
}
function testCall(lastSymbol) {
    if (lastSymbol === void 0) { lastSymbol = ''; }
    return double((0, stub_called_1.addScream)(stub_called_1.hello)) + lastSymbol;
}
exports.testCall = testCall;
