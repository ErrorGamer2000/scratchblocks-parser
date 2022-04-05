import BlockOpcode from "./types/opcodes.js";
import Category from "./types/categories.js";
import Lexer from "./lexer/lexer.js";
import InputOpcode from "./types/inputs.js";

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

export default class Parser {
  #lexer = new Lexer();
}
