import Lexer, { Token } from "../../lexer/lexer";
import { combineMatchers, defineMatch, Match } from "../../util/defineMatch";
import ParserNode from "../../util/parserNode";

const languages = [
  "Amharic",
  "Arabic",
  "Azerbaijani",
  "Basque",
  "Bulgarian",
  "Catalan",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "French",
  "Galician",
  "German",
  "Greek",
  "Hebrew",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Maori",
  "Norwegian",
  "Persian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Scots Gaelic",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swedish",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
  "Welsh",
  "Zulu"
];

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
        matchType: "multi",
        tokenTypes: ["lparen", "lbrac", "lt"],
        values: [
          {
            tokenType: "lparen",
            value: "("
          },
          {
            tokenType: "lbrac",
            value: "["
          },
          {
            tokenType: "lt",
            value: "<"
          }
        ],
        optional: false
      },
      {
        matchType: "function",
        match(l: Lexer): Match {
          //operator
          return null;
        },
        optional: true
      },
      {
        matchType: "multi",
        tokenTypes: ["rbrac", "rbracv", "rparen", "rparenv", "gt"],
        values: [
          {
            tokenType: "rbrac",
            value: "]"
          },
          {
            tokenType: "rbracv",
            value: "v]"
          },
          {
            tokenType: "rparen",
            value: ")"
          },
          {
            tokenType: "rparenv",
            value: "v)"
          },
          {
            tokenType: "gt",
            value: ">"
          }
        ],
        optional: false
      },
      {
        matchType: "whitespace",
        type: "whitespace",
        optional: true
      },
      {
        matchType: "single",
        tokenType: "string",
        value: "to",
        optional: false
      }
    ],
    function (tokens: Token[]): ParserNode {}
  ),
  defineMatch([], function (tokens: Token[]): ParserNode {})
);
