import BlockID from "./blockids.js";
import Category from "./categories.js";
import Lexer from "./lexer.js";

interface BlockInfo {
  category: Category;
  blockID: BlockID;
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
}
interface Script {
  isEmpty: boolean;
  isFinal: boolean;
  blocks: Block[];
}

export default class Parser {
  #lexer = new Lexer();
}
