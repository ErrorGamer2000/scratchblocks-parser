import BlockOpcode from "./types/opcodes";
import Category from "./types/categories";
import Lexer from "./lexer/lexer";
import InputOpcode from "./types/inputs";

interface Input {
  type: InputOpcode;
  value: string | number;
}

interface BlockInfo {
  category: Category;
  opcode: BlockOpcode;
}
interface BlockShape {
  isCap: boolean;
  isHat: boolean;
  isReporter: boolean;
  reporterShape: "bool" | "str";
  hasC: boolean;
}
interface Block {
  info: BlockInfo;
  shape: BlockShape;
  next: Block;
  child: Block | null;
}
interface Script {
  isEmpty: boolean;
  isFinal: boolean;
  start: Block;
}

module.exports = class Parser {
  #lexer = new Lexer();
  load(text: string): void {
    this.#lexer.load(text);
    this.#parse();
  }
  #parse(): void {
    console.log(this.#lexer.getTokenList());
  }
};
