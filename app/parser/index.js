import jison from "jison";
import bnf from "./grammar.jison";

let parser = new jison.Parser(bnf);

parser.getAST = (string) => {
    return parser.parse(string);
};

export default parser;