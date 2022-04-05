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

export type MatchDefinition = (
  | SingleMatch
  | MultiMatch
  | WhitespaceMatch
  | MatcherConnector
)[];
export type MatcherConnector = (l: Lexer) => MatcherFn;
export type MatcherFn = () => Match;
export type Match = { node: ParserNode; tokenLength: number } | null;

function isMatch(tkn: Token, matcher: MatchDefinition[number]): boolean {
  if (typeof matcher !== "function") {
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
  } else {
  }
}

export type MatchResult = (
  | { type: "token"; value: Token }
  | { type: "match"; value: Match }
)[];

export function defineMatch(
  matchDef: MatchDefinition,
  createASTNode: (tkns: MatchResult) => ParserNode
): MatcherConnector {
  return function connectMatcher(lexer: Lexer, dontFix = false): MatcherFn {
    if (lexer.tokenIndex < 0) lexer.seek(0);
    return function (): Match {
      let initialIndex = lexer.tokenIndex;
      let res: MatchResult = [];
      let current = lexer.at(initialIndex);
      if (!current || current.type === "EOF") return null;
      for (let matcher of matchDef) {
        current = lexer.next();
        if (!current || current.type === "EOF") {
          lexer.seek(initialIndex);
          return null;
        }
        let matches = ((): {
          match?: Match;
          matches: boolean;
        } => {
          if (typeof matcher !== "function")
            return { matches: isMatch(current, matcher) || matcher.optional };
          let match = matcher(lexer)();
          return match
            ? {
                match,
                matches: true
              }
            : {
                matches: false
              };
        })();
        if (!matches.matches) {
          lexer.seek(initialIndex);
          return null;
        } else {
          if (matches.match) {
            res.push({
              type: "match",
              value: matches.match
            });
          } else {
            res.push({
              type: "token",
              value: current
            });
          }
        }
      }

      //Reset the parser so it can try other matches as well on the same text
      if (!dontFix) lexer.seek(initialIndex);

      function reduceMatch(last: number, m: MatchResult[number]) {
        if (m.type === "token") {
          return last + 1;
        } else {
          return m.value.tokenLength;
        }
      }

      return {
        node: createASTNode(res),
        tokenLength: res.length
      };
    };
  };
}
defineMatch.valueAny = Symbol("defineMatch.valueAny");

export function combineMatchers(...a: MatcherConnector[]) {}
