export const todoReducer = (state = [], action) => {
    console.log(state, action);
    let newState = Object.assign([], state);
    switch (action.type) {
        case 'ADD_TODO':
            newState.push(action.value);
            break;
        case 'CLEAR_TODOS':
            newState = [];
            break;
        case 'LOAD_INITIAL_TODOS':
            newState = action.todos;
            break;
        default:
            break;
    }
    return newState;
};
