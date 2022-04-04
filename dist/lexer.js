var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Lexer_instances, _Lexer_charStream, _Lexer_idx, _Lexer_tokens, _Lexer_addToken;
import CharStream from "./chars.js";
export default class Lexer {
    constructor() {
        _Lexer_instances.add(this);
        _Lexer_charStream.set(this, new CharStream());
        _Lexer_idx.set(this, 0);
        _Lexer_tokens.set(this, []);
    }
    load(str) {
        __classPrivateFieldGet(this, _Lexer_charStream, "f").load(str);
        this.parse();
    }
    peek() {
        return __classPrivateFieldGet(this, _Lexer_tokens, "f")[__classPrivateFieldGet(this, _Lexer_idx, "f") + 1];
    }
    next() {
        var _a;
        return __classPrivateFieldGet(this, _Lexer_tokens, "f")[__classPrivateFieldSet(this, _Lexer_idx, (_a = __classPrivateFieldGet(this, _Lexer_idx, "f"), ++_a), "f")];
    }
    seek(idx) {
        return __classPrivateFieldGet(this, _Lexer_tokens, "f")[(__classPrivateFieldSet(this, _Lexer_idx, idx, "f"))];
    }
    parse() {
        function createToken(type, value) {
            return {
                type,
                value
            };
        }
        __classPrivateFieldSet(this, _Lexer_tokens, [], "f");
        let s = __classPrivateFieldGet(this, _Lexer_charStream, "f");
        let c;
        let escape = false;
        let string = "";
        const addLastString = () => {
            if (string) {
                let isNum = /^\d+(?:\.\d+)?$/.test(string.trim());
                if (isNum) {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("number", string));
                }
                else {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("string", string));
                }
            }
            string = "";
        };
        while (true) {
            c = s.next();
            // EOF
            if (typeof c === "symbol") {
                addLastString();
                __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("EOF", ""));
                return;
            }
            // Whitespace
            if (c.whitespace) {
                addLastString();
                if (!c.newline) {
                    let temp = c.text;
                    let p = s.peek();
                    while (typeof p !== "symbol" && p.whitespace && !p.newline) {
                        temp += p.text;
                        s.next();
                        p = s.peek();
                    }
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("whitespace", temp));
                }
                else {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("newline", "\n"));
                }
                continue;
            }
            // Parens and Brackets
            if (/\(|\)|\[|\]/.test(c.text) && !escape) {
                addLastString();
                if (c.text === "(") {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("lparen", "("));
                }
                if (c.text === ")") {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("rparen", ")"));
                }
                if (c.text === "[") {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("lparen", "["));
                }
                if (c.text === "]") {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("rparen", "]"));
                }
                continue;
            }
            // lt and gt
            if (/<|>/.test(c.text)) {
                addLastString();
                if (c.text === "<") {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("lt", "<"));
                }
                else {
                    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("gt", ">"));
                }
                continue;
            }
            // rparenv and rbracv
            let l = s.last();
            if (l && l.whitespace && c.text === "v" && !escape) {
                let t = s.peek();
                if (typeof t !== "symbol" && /\]|\)/.test(t.text)) {
                    addLastString();
                    s.next();
                    if (t.text === "]") {
                        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("rbracv", "v]"));
                    }
                    else {
                        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("rparenv", "v)"));
                    }
                    continue;
                }
            }
            // atlabel
            if (c.text === "@" && !escape) {
                addLastString();
                let temp = c.text;
                let t = s.peek();
                while (typeof t !== "symbol" && !t.whitespace) {
                    temp += t.text;
                    s.next();
                    t = s.peek();
                }
                __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, createToken("atlabel", temp));
                continue;
            }
            // escape
            if (c.text === "\\" && !escape) {
                escape = true;
                continue;
            }
            string += c.text;
            escape = false;
        }
    }
    getTokenList() {
        return __classPrivateFieldGet(this, _Lexer_tokens, "f");
    }
}
_Lexer_charStream = new WeakMap(), _Lexer_idx = new WeakMap(), _Lexer_tokens = new WeakMap(), _Lexer_instances = new WeakSet(), _Lexer_addToken = function _Lexer_addToken(t) {
    __classPrivateFieldGet(this, _Lexer_tokens, "f").push(t);
};
