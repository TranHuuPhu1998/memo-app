import * as Types from "../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CATEGORY:
            return [...action.data];
        case Types.ADD_CATEGORY:
            let task = {
                category : action.data.category,
                id : action.data.id
            };
            state.push(task);
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
