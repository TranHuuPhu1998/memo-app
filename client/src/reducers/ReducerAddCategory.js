import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.NEW_CATEGORY:
            state = action.data
            return {...state};
        default:
            return state;
    }
};

export default myReducer;
