export interface Character {
  text: string;
  code: number;
  whitespace: boolean;
  newline: boolean;
}

export default class CharStream {
  static EOF = Symbol("EOF");
  #stack: Character[] = [];
  #idx = -1;
  load(str: string): void {
    this.#stack = str.split("").map(function (c) {
      return {
        text: c,
        code: c.charCodeAt(0),
        whitespace: /\s/.test(c),
        newline: /\n/.test(c)
      };
    });
  }
  peek(): Character | typeof CharStream.EOF {
    return this.#stack[this.#idx + 1] ?? CharStream.EOF;
  }
  next(): Character | typeof CharStream.EOF {
    return this.#stack[++this.#idx] ?? CharStream.EOF;
  }
  last(): Character | null {
    return this.#stack[this.#idx - 1] ?? null;
  }
}
