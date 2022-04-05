import CharStream, { Character } from "./chars";
import TokenName from "./tokens";

export interface Token {
  type: TokenName;
  value: string;
}

export type NextFn = typeof Lexer.prototype.next;
export type PeekFn = typeof Lexer.prototype.peek;

export default class Lexer {
  #charStream = new CharStream();
  #tokenIndex = -1;
  #tokens: Token[] = [];
  load(str: string): void {
    this.#charStream.load(str);
    this.lex();
  }

  peek(): Token {
    return this.#tokens[this.#tokenIndex + 1];
  }
  next(): Token {
    return this.#tokens[++this.#tokenIndex];
  }
  seek(idx: number): Token {
    return this.#tokens[(this.#tokenIndex = idx)];
  }
  at(idx: number): Token | undefined {
    return this.#tokens[idx];
  }
  get tokenIndex() {
    return this.#tokenIndex;
  }

  lex(): void {
    function createToken(type: TokenName, value: string): Token {
      return {
        type,
        value
      };
    }

    this.#tokens = [];

    let s = this.#charStream;
    let c: ReturnType<typeof s.next>;
    let escape = false;
    let string = "";

    const addLastString = () => {
      if (string) {
        let isNum = /^\d+(?:\.\d+)?$/.test(string.trim());
        if (isNum) {
          this.#addToken(createToken("number", string));
        } else {
          let isColor =
            /^#(?:[0-9a-f]{3}|[0-9A-F]{3})|(?:[0-9a-f]{6}|[0-9A-F]{6})$/.test(
              string
            );
          if (isColor) {
            this.#addToken(createToken("color", string));
          } else {
            this.#addToken(createToken("string", string));
          }
        }
      }
      string = "";
    };

    while (true) {
      c = s.next();

      // EOF
      if (typeof c === "symbol") {
        addLastString();
        this.#addToken(createToken("EOF", ""));
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
          this.#addToken(createToken("whitespace", temp));
        } else {
          this.#addToken(createToken("newline", "\n"));
        }
        continue;
      }

      // Parens and Brackets
      if (/\(|\)|\[|\]/.test(c.text) && !escape) {
        addLastString();
        if (c.text === "(") {
          this.#addToken(createToken("lparen", "("));
        }
        if (c.text === ")") {
          this.#addToken(createToken("rparen", ")"));
        }
        if (c.text === "[") {
          this.#addToken(createToken("lparen", "["));
        }
        if (c.text === "]") {
          this.#addToken(createToken("rparen", "]"));
        }
        continue;
      }

      // lt and gt
      if (/<|>/.test(c.text)) {
        addLastString();
        if (c.text === "<") {
          this.#addToken(createToken("lt", "<"));
        } else {
          this.#addToken(createToken("gt", ">"));
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
            this.#addToken(createToken("rbracv", "v]"));
          } else {
            this.#addToken(createToken("rparenv", "v)"));
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
        this.#addToken(createToken("atlabel", temp));
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

  #addToken(t: Token): void {
    this.#tokens.push(t);
  }

  getTokenList(): Token[] {
    return this.#tokens;
  }
}
