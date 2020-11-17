import * as Types from "../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.HISTORY_DELETE:
            state = action.data
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
