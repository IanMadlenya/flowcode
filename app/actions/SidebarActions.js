import Constants from "../Constants";

export default {
    updateCode: (newCode) => {
        return {type: Constants.UPDATE_CODE, newCode}
    },
    setSyntaxErrors: (syntaxErrors) => {
        return {type: Constants.SET_SYNTAX_ERRORS, syntaxErrors}
    },
    updateAST: (AST) => {
        return {type: Constants.UPDATE_AST, AST}
    }
}