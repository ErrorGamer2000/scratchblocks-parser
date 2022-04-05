import Lexer from "./lexer/lexer";

let lex = new Lexer();
lex.load(`if <(5) = (@cloud var1)> then
set [color v] effect to (5)
end`);

console.log(lex.getTokenList());
