import Constants from "../Constants";

export default (state = {}, action) => {
    // copying the old state here, so we never mutate it
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.UPDATE_CODE:
            newState.Code = action.newCode;
            return newState;
            break;
        case Constants.SET_SYNTAX_ERRORS:
            newState.SyntaxErrors = action.syntaxErrors;
            return newState;
            break;
        case Constants.UPDATE_AST:
            newState.AST = action.AST;
            return newState;
            break;
        default:
            return state;
    }
};
