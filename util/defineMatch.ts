import Lexer, { Token } from "../lexer/lexer";
import TokenName from "../lexer/tokens";
import ParserNode from "./parserNode";

export type ValueMatcher = string | number | RegExp;

export interface MatchBase {
  tokenType: TokenName;
  value: ValueMatcher | ValueMatcher[] | typeof defineMatch.valueAny;
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
  matchType: "whitespace";
  type: "newline" | "whitespace";
  optional: boolean;
}

export type MatchDefinition = (SingleMatch | MultiMatch | WhitespaceMatch)[];
export type MatcherConnector = (l: Lexer) => MatcherFn;
export type MatcherFn = () => Match;
export type Match = { node: ParserNode; tokenLength: number } | null;

function isMatch(tkn: Token, matcher: MatchDefinition[number]): boolean {
  function matchValue(
    v: ValueMatcher | ValueMatcher[] | typeof defineMatch.valueAny
  ): boolean {
    if (v === defineMatch.valueAny) return true;
    if (typeof v === "string") {
      return tkn.value === v;
    } else if (typeof v === "number") {
      return v.toString() === tkn.value;
    } else if (v instanceof RegExp) {
      return v.test(tkn.value);
    } else if (Array.isArray(v)) {
      return v.some(matchValue);
    }
  }
  if (matcher.matchType === "single") {
    if (tkn.type !== matcher.tokenType) return false;
    return matchValue(matcher.value);
  } else if (matcher.matchType === "whitespace") {
    return (
      (tkn.type === "whitespace" && matcher.type === "whitespace") ||
      (tkn.type === "newline" && matcher.type === "newline")
    );
  } else {
    if (matcher.tokenTypes.includes(tkn.type)) {
      for (let valueMatcher of matcher.values) {
        if (valueMatcher.tokenType !== tkn.type) continue;
        if (matchValue(valueMatcher.value)) return true;
      }
      return false;
    } else {
      return false;
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
