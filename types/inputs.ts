const inputs = [
  "number",
  "integer",
  "whole_number",
  "positive_number",
  "angle",
  "matrix",
  "color"
] as const;

type InputOpcode = typeof inputs[number];

export default InputOpcode;
