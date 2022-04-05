import { Token } from "../../lexer/lexer";
import { combineMatchers, defineMatch } from "../../util/defineMatch";
import ParserNode from "../../util/parserNode";

export default combineMatchers(
  defineMatch([], function (tokens: Token[]): ParserNode {}),
  defineMatch([], function (tokens: Token[]): ParserNode {})
);
