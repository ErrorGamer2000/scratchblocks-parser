let tokens = [
  "lparen",
  "rparen",
  "lbrac",
  "rbrac",
  "rparenv",
  "rbracv",
  "lt",
  "gt",
  "number",
  "string",
  "atlabel",
  "whitespace",
  "newline",
  "EOF"
] as const;

type TokenName = typeof tokens[number];

export default TokenName;
