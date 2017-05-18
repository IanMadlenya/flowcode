/* lexical grammar */
%lex
%%

\s+                             /* skip whitespace */
'while'                         return 'WHILE'
'if'                            return 'IF'
'else'                          return 'ELSE'
[a-zA-Z0-9 ?!.]+                return 'ID'
";"                             return 'SEMICOLON'
"("                             return '('
")"                             return ')'
"{"                             return '{'
"}"                             return '}'
<<EOF>>                         return 'EOF'
/lex

%start expressions

%% /* language grammar */

expressions
    : program EOF
    {return {data:'root',children:$1,type:'root'};}
    ;

program
    : statement program
    { if($2) $1.push($2); $$=[].concat.apply([], $1); }
    | %empty
    ;

statement
    : if
    | command
    { $$=[{data:$1,children:null,type:'command'}]; }
    | while
    ;

if
    : IF "(" ID ")" "{" program "}" else
    { $$=[{data:$3, children:$6,else:$8, type:'if'}]; }
    ;

else
    : ELSE "{" program "}"
    { $$=$3 }
    | %empty
    ;

while
    : WHILE "(" ID ")" "{" program "}"
    { $$=[{data:$3, children:$6, type:'while'}]; }
    ;

command
    : ID SEMICOLON
    { $$ = $1; }
    ;
