import Interpreter from './interpreter.ts';
import Lexer from './lexer.ts';
import Parser from './parser.ts';
import Scope from './scope.ts';
import { BuiltInFunction } from './values/function.ts';
import Value from './values/mod.ts';

let log = false;

if (Deno.args[0] === 'help') console.log('Usage: thor [path?] [--log?]');
else if (Deno.args.length === 0) runPrompt();
else {
  if (Deno.args[1] === '--log') log = true;
  runFile(Deno.args[0]);
}

function runFile(path: string): void {
  const text = Deno.readTextFileSync(path);
  run(text);
}

function runPrompt(): void {
  while (true) {
    const line = prompt('>');
    if (line === null) continue;
    const value = run(line, true);
    if (!value) continue;
    console.log(value.toString());
  }
}

export default function run(text: string, repl = false): Value | undefined {
  try {
    const lexer = new Lexer(text);
    const tokens = lexer.lex();
    if (log)
      console.log(
        'tokens:',
        `[
  ${tokens.join(',\n  ')}
]`,
        '\n'
      );

    const parser = new Parser(tokens);
    const ast = parser.parse();
    if (log) console.log('ast:', ast.toString(), '\n');

    const interpreter = new Interpreter();
    const globalScope = new Scope('<program>');
    BuiltInFunction.setupGlobalSymbolTable(globalScope.symbolTable);
    const value = interpreter.visit(repl ? ast.nodes[0] : ast, globalScope);
    return value;
  } catch (e) {
    console.error(e);
  }
}
