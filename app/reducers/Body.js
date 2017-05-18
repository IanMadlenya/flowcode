export default (state = {}, action) => {
    // copying the old state here, so we never mutate it
    let newState = Object.assign({}, state);

    switch (action.type) {
        default:
            return state;
    }
};
