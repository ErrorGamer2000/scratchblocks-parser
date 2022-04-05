import { Token } from "../../lexer/lexer";
import { combineMatchers, defineMatch } from "../../util/defineMatch";
import ParserNode from "../../util/parserNode";

export default combineMatchers(
  defineMatch(
    [
      {
        matchType: "single",
        tokenType: "string",
        value: "translate",
        optional: false
      },
      {
        matchType: "whitespace",
        type: "whitespace",
        optional: true
      },
      {
        matchType: "single",
        tokenType: "lparen",
        value: "(",
        optional: false
      }
    ],
    function (tokens: Token[]): ParserNode {}
  ),
  defineMatch([], function (tokens: Token[]): ParserNode {})
);
