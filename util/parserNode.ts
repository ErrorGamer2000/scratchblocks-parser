import BlockOpcode from "../types/opcodes";
import Category from "../types/categories";
import Input from "../types/inputs";

export default interface ParserNode {
  type: string;
  blockOpcode: BlockOpcode | Input;
  category: Category | null;
  operator: boolean;
  fields: {
    [key: string]: ParserNode;
  };
  children: null | ParserNode[];
}
