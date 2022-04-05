import Lexer, { Token } from "../lexer/lexer";
import TokenName from "../lexer/tokens";
import ParserNode from "./parserNode";

export interface MatchBase {
  tokenType: TokenName;
  value: string | number | RegExp | typeof defineMatch.valueAny;
}

export interface SingleMatch extends MatchBase {
  matchType: "single";
  optional: boolean;
}

export interface MultiMatch {
  matchType: "multi";
  tokenTypes: TokenName[];
  values: MatchBase[];
  optional: boolean;
}

export interface WhitespaceMatch {
  optional: boolean;
  type: "newline" | "whitespace";
}

export type MatchDefinition = (SingleMatch | MultiMatch)[];
export type MatcherConnector = (l: Lexer) => MatcherFn;
export type MatcherFn = () => Match;
export type Match = { node: ParserNode; tokenLength: number } | null;

function isMatch(tkn: Token, matcher: MatchDefinition[number]): boolean {
  if (matcher.matchType === "single") {
    if (tkn.type !== matcher.tokenType) return false;
    if (matcher.value === defineMatch.valueAny) return true;
    if (typeof matcher.value === "string") {
      return tkn.value === matcher.value;
    } else if (typeof matcher.value === "number") {
      return matcher.value.toString() === tkn.value;
    } else if (matcher.value instanceof RegExp) {
      return matcher.value.test(tkn.value);
    }
  }
}

export function defineMatch(
  matchDef: MatchDefinition,
  createASTNode: (tkns: Token[]) => ParserNode
): MatcherConnector {
  return function connectMatcher(lexer: Lexer) {
    if (lexer.tokenIndex < 0) lexer.seek(0);
    return function (): Match {
      let initialIndex = lexer.tokenIndex;
      let tokens = [];
      let current = lexer.at(initialIndex);
      if (!current || current.type === "EOF") return null;
      for (let matcher of matchDef) {
        current = lexer.next();
        if (current.type === "EOF") {
          lexer.seek(initialIndex);
          return null;
        }
        let matches = isMatch(current, matcher) || matcher.optional;
        if (!matches) {
          lexer.seek(initialIndex);
          return null;
        } else {
          if (!matcher.optional) tokens.push(current);
        }
      }

      //Reset the parser so it can try other matches as well on the same text
      lexer.seek(initialIndex);

      return {
        node: createASTNode(tokens),
        tokenLength: tokens.length
      };
    };
  };
}
defineMatch.valueAny = Symbol("defineMatch.valueAny");

export function combineMatchers(...a: MatcherConnector[]) {}
