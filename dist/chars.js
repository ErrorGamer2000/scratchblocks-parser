var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CharStream_stack, _CharStream_idx;
export default class CharStream {
    constructor() {
        _CharStream_stack.set(this, []);
        _CharStream_idx.set(this, -1);
    }
    load(str) {
        __classPrivateFieldSet(this, _CharStream_stack, str.split("").map(function (c) {
            return {
                text: c,
                code: c.charCodeAt(0),
                whitespace: /\s/.test(c),
                newline: /\n/.test(c)
            };
        }), "f");
        __classPrivateFieldSet(this, _CharStream_idx, 0, "f");
    }
    peek() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _CharStream_stack, "f")[__classPrivateFieldGet(this, _CharStream_idx, "f") + 1]) !== null && _a !== void 0 ? _a : CharStream.EOF;
    }
    next() {
        var _a;
        var _b;
        return (_a = __classPrivateFieldGet(this, _CharStream_stack, "f")[__classPrivateFieldSet(this, _CharStream_idx, (_b = __classPrivateFieldGet(this, _CharStream_idx, "f"), ++_b), "f")]) !== null && _a !== void 0 ? _a : CharStream.EOF;
    }
    last() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _CharStream_stack, "f")[__classPrivateFieldGet(this, _CharStream_idx, "f") - 1]) !== null && _a !== void 0 ? _a : null;
    }
}
_CharStream_stack = new WeakMap(), _CharStream_idx = new WeakMap();
CharStream.EOF = Symbol("EOF");
